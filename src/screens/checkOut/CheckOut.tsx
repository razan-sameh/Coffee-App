import React, {useEffect, useMemo, useReducer, useRef} from 'react';
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
import {typDeliveryInfo, typOrder} from '../../Content/Types';
import {RootState, useAppDispatch} from '../../redux/store';
import {updateUserProfileAsync} from '../../redux/slices/userSlice';
import {useSelector} from 'react-redux';
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
import {useLocation} from '../../provider/LocationProvider';
import PhoneInput from 'react-native-phone-number-input';
import PhoneField from './component/PhoneField';
import SaveOptionsRow from './component/SaveOptionsRow';
import AddressField from './component/AddressField';

const CheckOut = () => {
  const {user} = useSelector((state: RootState) => state.user);
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<typDeliveryInfo>({
    defaultValues: {
      name: getUserName()!,
      phone: user?.phoneNumber?.[0] || {
        countryCode: '',
        countryISO: '',
        number: '',
      },
      address: user?.address?.[0] || null,
    },
  });
  const phoneInputRef = useRef<PhoneInput>(null);
  const [state, dispatch] = useReducer(checkoutReducer, checkoutInitialState);
  const {confirmPayment} = useStripe();
  const navigationTo: NavigationProp<ParamListBase> = useNavigation();
  const appDispatch = useAppDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const {location, isPicked, setIsPicked} = useLocation();

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.count, 0);
  }, [cartItems]);

  const {data: products, isLoading: loadingProducts} = useGetProductsQuery();
  const productMap = useMemo(() => {
    const map = new Map();
    products?.forEach(p => map.set(p.ID, p));
    return map;
  }, [products]);

  useEffect(() => {
    if (location && isPicked) {
      setValue('address', location); // 👈 same as EditProfile
      setIsPicked(false); // reset flag
    }
  }, [location, isPicked, setValue, setIsPicked]);

  const handlePlaceOrder = async (formData: typDeliveryInfo) => {
    const deliveryInfo: typDeliveryInfo = {
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
    };

    const order = {
      items: cartItems.map(item => ({
        productID: item.productID,
        size: item.size,
        count: item.count,
        price: item.price,
      })),
      SubTotal: Number(totalPrice.toFixed(2)),
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

  const handlePay = async (formData: typDeliveryInfo) => {
    dispatch({type: 'SET_CHECKOUT_LOADING', payload: true});
    try {
      const userID = getUserID();
      if (userID) {
        if (state.savePhone) {
          const rawNumber =
            phoneInputRef.current?.getNumberAfterPossiblyEliminatingZero()
              ?.number;
          const countryCode = `+${phoneInputRef.current?.getCallingCode()}`;
          const countryISO = phoneInputRef.current?.getCountryCode(); // e.g. "EG"

          if (rawNumber && countryCode && countryISO) {
            const existingPhones = user?.phoneNumber || [];
            await appDispatch(
              updateUserProfileAsync({
                Uid: userID,
                phoneNumber: [
                  ...existingPhones,
                  {
                    countryCode,
                    countryISO,
                    number: rawNumber,
                  },
                ],
              }),
            );
          }
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
            name="name"
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
          {errors.name && (
            <Text style={Styles.txtError}>This is required.</Text>
          )}

          {/* Phone Number */}
          <Controller
            control={control}
            name="phone"
            rules={{required: true}}
            render={({field}) => (
              <>
                <Text style={Styles.txtInputTitle}>Phone Number</Text>

                <PhoneField
                  ref={phoneInputRef}
                  value={field.value}
                  onChange={field.onChange}
                  savedPhones={user?.phoneNumber} // ✅ pass saved phones
                  hasError={!!errors.phone}
                  errorMessage={
                    errors.phone?.type === 'required' ? 'This is required.' : ''
                  }
                  isAdding={state.isAddingPhoneNumber} // ✅ pass the adding flag
                />

                <SaveOptionsRow
                  label="Phone Number"
                  showSaveCheckbox
                  saveValue={state.savePhone}
                  setSaveValue={v =>
                    dispatch({type: 'SET_SAVE_PHONE', payload: v})
                  }
                  userValues={user?.phoneNumber}
                  isAdding={state.isAddingPhoneNumber} // ✅ pass the adding flag
                  setIsAdding={v =>
                    dispatch({type: 'TOGGLE_ADD_PHONE', payload: v})
                  }
                />
              </>
            )}
          />

          <Controller
            control={control}
            name="address"
            rules={{required: true}}
            render={({field}) => (
              <>
                <Text style={Styles.txtInputTitle}>Location</Text>

                <AddressField
                  value={field.value}
                  savedAddresses={user?.address} // ✅ pass saved addresses
                  hasError={!!errors.address}
                  errorMessage="Please select location"
                  isAdding={state.isAddingPhoneNumber} // ✅ pass the adding flag
                />

                <SaveOptionsRow
                  label="Location"
                  showSaveCheckbox
                  saveValue={state.saveAddress}
                  setSaveValue={v =>
                    dispatch({type: 'SET_SAVE_ADDRESS', payload: v})
                  }
                  userValues={user?.address}
                  isAdding={state.isAddingAddress} // ✅ pass the adding flag
                  setIsAdding={v =>
                    dispatch({type: 'TOGGLE_ADD_ADDRESS', payload: v})
                  }
                />
              </>
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
