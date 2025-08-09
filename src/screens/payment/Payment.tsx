import React, {useMemo, useState} from 'react';
import {Alert, Text, View, ScrollView, ActivityIndicator} from 'react-native';
import {ArrowBack} from '../../Components/ArrowBack';
import FastImage from 'react-native-fast-image';
import {images} from '../../Content/resources';
import {useStripe} from '@stripe/stripe-react-native';
import type {CardFieldInput} from '@stripe/stripe-react-native';
import {Styles} from './PaymentStyle';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../redux/store';
import {useGetProductsQuery} from '../../services/firebaseApi';
import {CardDetails} from './component/CardDetails';
import {PayButton} from './component/PayButton';
import {PaymentMethodSelector} from './component/PaymentMethodSelector';
import {PaymentSummary} from './component/PaymentSummary';
import {enmPaymentMethod} from '../../Content/Enums';
import {addOrder} from '../../redux/slices/ordersSlice';
import {serverURL} from '../../../App';
import {resetDeliveryInfo} from '../../redux/slices/deliveryInfoSlice';
import {clearCartFirebase} from '../../redux/slices/cartSlice';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {DeliveryInfoSummary} from './component/DeliveryInfoSummary';
import {typOrder} from '../../Content/Types';

export function Payment() {
  const {confirmPayment} = useStripe();
  const [cardDetails, setCardDetails] = useState<CardFieldInput.Details | null>(
    null,
  );
  const [paymentType, setPaymentType] = useState<enmPaymentMethod>(
    enmPaymentMethod.CreditCard,
  );
  const appDispatch = useAppDispatch();
  const dispatch = useDispatch();
  const {user} = useSelector((state: RootState) => state.user);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const deliveryInfo = useSelector((state: RootState) => state.deliveryInfo);
  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.count, 0);
  }, [cartItems]);
  const {data: products, isLoading: loadingProducts} = useGetProductsQuery();
  const navigationTo: NavigationProp<ParamListBase> = useNavigation();

  const productMap = useMemo(() => {
    const map = new Map();
    products?.forEach(p => map.set(p.ID, p));
    return map;
  }, [products]);

  const handlePlaceOrder = async () => {
    const order = {
      items: cartItems.map(item => ({
        productID: item.productID,
        size: item.size,
        count: item.count,
        price: item.price,
      })),
      total: totalPrice,
      paymentMethod: paymentType,
      deliveryInfo: deliveryInfo,
      userId: user?.Uid!,
    };
    console.log({order});
    const ordered: typOrder = await appDispatch(addOrder(order)).unwrap();
    await appDispatch(clearCartFirebase(user?.Uid!));
    dispatch(resetDeliveryInfo());
    navigationTo.navigate('CartNavigator', {
      screen: 'OrderConfirmation',
      params: {orderID: ordered.id},
    });
  };

  const handlePay = async () => {
    if (paymentType === enmPaymentMethod.cash) {
      handlePlaceOrder();
      return;
    }

    if (!cardDetails?.complete) {
      Alert.alert('Please enter complete card details');
      return;
    }

    try {
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
        paymentMethodData: {
          billingDetails: {email: user?.email},
        },
      });

      if (error) {
        Alert.alert('Payment failed', error.message);
      } else if (paymentIntent) {
        Alert.alert('Payment successful', `Status: ${paymentIntent.status}`);
        handlePlaceOrder();
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Something went wrong');
    }
  };

  if (loadingProducts) {
    return (
      <View style={Styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={Styles.mainContainer}>
      <View style={Styles.backArrowContainer}>
        <ArrowBack />
        <Text style={Styles.txtTitle}>Payment</Text>
      </View>

      {/* <FastImage
        style={Styles.wave}
        resizeMode="contain"
        source={images.WallWave}
      /> */}
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

      <PaymentSummary
        cartItems={cartItems}
        productMap={productMap}
        total={totalPrice}
      />

      <DeliveryInfoSummary deliveryInfo={deliveryInfo} />

      <PaymentMethodSelector
        paymentType={paymentType}
        setPaymentType={setPaymentType}
      />
      {paymentType === enmPaymentMethod.CreditCard && (
        <CardDetails setCardDetails={setCardDetails} />
      )}
      <PayButton
        onPress={handlePay}
        disabled={
          paymentType === enmPaymentMethod.CreditCard && !cardDetails?.complete
        }
      />
    </ScrollView>
  );
}
