import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {images} from '../../Content/resources';
import {Styles} from './OrderConfirmationStyle';
import {
  useGetOrderByIdQuery,
  useGetProductsQuery,
} from '../../services/firebaseApi';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {OrderConfirmationBackground} from './component/OrderConfirmationBackground';
import {OrderConfirmationButtons} from './component/OrderConfirmationButtons';
import {OrderConfirmationHeader} from './component/OrderConfirmationHeader';
import {OrderConfirmationSummary} from './component/OrderConfirmationSummary';

const OrderConfirmation = () => {
  const navigationTo: NavigationProp<ParamListBase> = useNavigation();
  const route = useRoute();
  const {orderID} = route.params as {orderID: string};

  const {data: order, isLoading: loadingOrder} = useGetOrderByIdQuery(orderID);
  const {data: products, isLoading: loadingProducts} = useGetProductsQuery();

  if (loadingOrder || loadingProducts) {
    return (
      <View style={Styles.mainContainer}>
        <Text>Loading order details...</Text>
      </View>
    );
  }

  if (!order) {
    return (
      <View style={Styles.mainContainer}>
        <Text>Order not found</Text>
      </View>
    );
  }

  return (
    <View style={Styles.mainContainer}>
      <OrderConfirmationHeader />

      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 30}}>
        {/* Confirmation Icon + Text */}
        <View style={{alignItems: 'center', marginTop: 20}}>
          <FastImage
            source={images.ConfirmedIcon}
            style={{width: 80, height: 80}}
            resizeMode="contain"
          />
          <Text style={Styles.txtTitle}>Order Confirmed!</Text>
          <Text style={Styles.txtDes}>
            Thank you for your order! Your coffee is on its way.
          </Text>
        </View>

        {/* Summary */}
        <OrderConfirmationSummary order={order} products={products!} />

        {/* Buttons */}
        <OrderConfirmationButtons navigationTo={navigationTo} />
      </ScrollView>

      {/* Background */}
      <OrderConfirmationBackground />
    </View>
  );
};

export default OrderConfirmation;
