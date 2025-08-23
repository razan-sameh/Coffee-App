import React, {useCallback, useEffect} from 'react';
import {View, Text, ScrollView, BackHandler} from 'react-native';
import FastImage from 'react-native-fast-image';
import {images} from '../../Content/resources';
import {Styles} from './OrderConfirmationStyle';
import {
  useGetOrderByIdQuery,
  useGetProductsQuery,
} from '../../services/firebaseApi';
import {
  CommonActions,
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {OrderConfirmationBackground} from './component/OrderConfirmationBackground';
import {OrderConfirmationButtons} from './component/OrderConfirmationButtons';
import {OrderConfirmationSummary} from './component/OrderConfirmationSummary';

const OrderConfirmation = () => {
  const route = useRoute();
  const {orderID} = route.params as {orderID: string};
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const {data: order, isLoading: loadingOrder} = useGetOrderByIdQuery(orderID);
  const {data: products, isLoading: loadingProducts} = useGetProductsQuery();

  const handleBackToHome = useCallback(() => {
    // First, reset CartNavigator to start fresh at 'Cart'
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'CartNavigator',
            state: {
              routes: [{name: 'Cart'}],
            },
          },
        ],
      }),
    );

    // Then navigate to Home in TapNavigator
    navigation.navigate('TapNavigator', {screen: 'Home'});
  }, [navigation]);

  useEffect(() => {
    const backAction = () => {
      handleBackToHome();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [handleBackToHome]);

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
        <OrderConfirmationButtons onBackPress={handleBackToHome} />
      </ScrollView>

      {/* Background */}
      <OrderConfirmationBackground />
    </View>
  );
};

export default OrderConfirmation;
