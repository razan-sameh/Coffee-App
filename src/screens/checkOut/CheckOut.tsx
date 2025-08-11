import React, {useMemo, useReducer} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ActivityIndicator,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {images} from '../../Content/resources';
import {Styles} from './CheckOutStyle';
import {ArrowBack} from '../../Components/ArrowBack';
import {Controller, useForm} from 'react-hook-form';
import {TextInput} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import {typCheckout, typDeliveryInfo, typOrder} from '../../Content/Types';
import {RootState, useAppDispatch} from '../../redux/store';
import {addUserDetails} from '../../redux/slices/userSlice';
import {useSelector} from 'react-redux';
import CheckOutField from './component/CheckOutField';
import {getUserID, getUserName} from '../../services/Authentication';
import {enmPaymentMethod} from '../../Content/Enums';
import {CardDetails} from './component/CardDetails';
import {PaymentMethodSelector} from './component/PaymentMethodSelector';
import {OrderSummary} from './component/OrderSummary';
import {useStripe} from '@stripe/stripe-react-native';
import {serverURL} from '../../../App';
import {clearCartFirebase} from '../../redux/slices/cartSlice';
import {addOrder} from '../../redux/slices/ordersSlice';
import {useGetProductsQuery} from '../../services/firebaseApi';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {checkoutInitialState, checkoutReducer} from './checkoutReducer';
import {PlaceOrderButton} from './component/PlaceOrderButton';

const CheckOut = () => {
  const {user} = useSelector((state: RootState) => state.user);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<typCheckout>({
    defaultValues: {
      strFullName: getUserName()!,
      strPhoneNumber: user?.phoneNumber?.[0] || '',
      strAddress: user?.address?.[0] || '',
    },
  });

  const [state, dispatch] = useReducer(checkoutReducer, checkoutInitialState);
  const {confirmPayment} = useStripe();
  const navigationTo: NavigationProp<ParamListBase> = useNavigation();
  const appDispatch = useAppDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.count, 0);
  }, [cartItems]);

  const {data: products, isLoading: loadingProducts} = useGetProductsQuery();
  const productMap = useMemo(() => {
    const map = new Map();
    products?.forEach(p => map.set(p.ID, p));
    return map;
  }, [products]);

  // ---------------- Handlers ----------------

  const handlePlaceOrder = async (formData: typCheckout) => {
    const deliveryInfo: typDeliveryInfo = {
      name: formData.strFullName,
      phone: formData.strPhoneNumber,
      address: formData.strAddress,
    };

    const order = {
      items: cartItems.map(item => ({
        productID: item.productID,
        size: item.size,
        count: item.count,
        price: item.price,
      })),
      total: totalPrice,
      paymentMethod: state.paymentType,
      deliveryInfo,
      userId: user?.Uid!,
    };

    const ordered: typOrder = await appDispatch(addOrder(order)).unwrap();
    await appDispatch(clearCartFirebase(user?.Uid!));

    navigationTo.navigate('CartNavigator', {
      screen: 'OrderConfirmation',
      params: {orderID: ordered.id},
    });
  };

  const handlePay = async (formData: typCheckout) => {
    dispatch({type: 'SET_CHECKOUT_LOADING', payload: true});
    try {
      const userID = getUserID();
      if (userID) {
        if (state.savePhone || state.saveAddress) {
          await appDispatch(
            addUserDetails({
              Uid: userID,
              ...(state.savePhone && {phoneNumber: formData.strPhoneNumber}),
              ...(state.saveAddress && {address: formData.strAddress}),
            }),
          );
        }
      }

      if (state.paymentType === enmPaymentMethod.cash) {
        await handlePlaceOrder(formData);
        return;
      }

      if (!state.cardDetails?.complete) {
        ToastAndroid.show(
          'Please enter complete card details.',
          ToastAndroid.SHORT,
        );
        return;
      }

      const response = await fetch(
        `${serverURL}/api/payment/create-payment-intent`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({amount: Math.round(totalPrice * 100)}),
        },
      );

      const {clientSecret} = await response.json();
      const {error, paymentIntent} = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
        paymentMethodData: {billingDetails: {email: user?.email}},
      });

      if (error) {
        ToastAndroid.show(
          `Payment failed: ${error.message}`,
          ToastAndroid.SHORT,
        );
      } else if (paymentIntent) {
        await handlePlaceOrder(formData);
      }
    } catch (err: any) {
      ToastAndroid.show(
        `Error: ${err.message || 'Something went wrong'}`,
        ToastAndroid.SHORT,
      );
    } finally {
      dispatch({type: 'SET_CHECKOUT_LOADING', payload: false});
    }
  };

  if (loadingProducts) {
    return (
      <View style={Styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // ---------------- UI ----------------
  return (
    <View style={Styles.mainContainer}>
      <View style={Styles.backArrowContainer}>
        <ArrowBack />
        <Text style={Styles.txtTitle}>CheckOut</Text>
      </View>

      <FastImage
        style={Styles.wallCoffeeImage1}
        resizeMode="contain"
        source={images.LoginWallIcon1}
      />
      <FastImage
        style={Styles.wallCoffeeImage2}
        resizeMode="contain"
        source={images.LoginWallIcon2}
      />

      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Full Name */}
          <Controller
            control={control}
            name="strFullName"
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <View>
                <Text style={Styles.txtInputTitle}>Full Name</Text>
                <TextInput
                  style={Styles.input}
                  placeholderTextColor={'#A19D9D'}
                  placeholder="Your Full Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  underlineStyle={{display: 'none'}}
                />
              </View>
            )}
          />
          {errors.strFullName && (
            <Text style={Styles.txtError}>This is required.</Text>
          )}

          {/* Phone Number */}
          <Controller
            control={control}
            name="strPhoneNumber"
            rules={{
              pattern: /^(01[0125][0-9]{8}|0[2-9][0-9]{8})$/,
              required: true,
            }}
            render={({field}) => (
              <CheckOutField
                label="Phone Number"
                placeholder="Phone Number"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                userValues={user?.phoneNumber}
                isAdding={state.isAddingPhoneNumber}
                setIsAdding={v =>
                  dispatch({type: 'TOGGLE_ADD_PHONE', payload: v})
                }
                saveValue={state.savePhone}
                setSaveValue={v =>
                  dispatch({type: 'SET_SAVE_PHONE', payload: v})
                }
                hasError={!!errors.strPhoneNumber}
                errorMessage={
                  errors.strPhoneNumber?.type === 'pattern'
                    ? 'The Phone Number must be 11 digits.'
                    : 'This is required.'
                }
              />
            )}
          />

          {/* Address */}
          <Controller
            control={control}
            name="strAddress"
            rules={{required: true}}
            render={({field}) => (
              <CheckOutField
                label="Address"
                placeholder="Address"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                userValues={user?.address}
                isAdding={state.isAddingAddress}
                setIsAdding={v =>
                  dispatch({type: 'TOGGLE_ADD_ADDRESS', payload: v})
                }
                saveValue={state.saveAddress}
                setSaveValue={v =>
                  dispatch({type: 'SET_SAVE_ADDRESS', payload: v})
                }
                hasError={!!errors.strAddress}
                errorMessage="This is required."
              />
            )}
          />

          {/* Order Summary */}
          <OrderSummary
            cartItems={cartItems}
            productMap={productMap}
            total={totalPrice}
          />

          {/* Payment Method */}
          <PaymentMethodSelector
            paymentType={state.paymentType}
            setPaymentType={v =>
              dispatch({type: 'SET_PAYMENT_TYPE', payload: v})
            }
          />

          {/* Card Details */}
          {state.paymentType === enmPaymentMethod.CreditCard && (
            <CardDetails
              setCardDetails={d =>
                dispatch({type: 'SET_CARD_DETAILS', payload: d})
              }
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Submit Button */}
      <View style={Styles.fixedButtonContainer}>
        <PlaceOrderButton
          onPress={handleSubmit(handlePay)}
          disabled={
            state.isCheckOut ||
            (state.paymentType === enmPaymentMethod.CreditCard &&
              !state.cardDetails?.complete)
          }
          loading={state.isCheckOut}
        />
      </View>
    </View>
  );
};

export default CheckOut;
