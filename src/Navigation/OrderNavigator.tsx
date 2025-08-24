import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyOrder from '../screens/myOrder/MyOrder';
import OrderDetails from '../screens/orderDetails/OrderDetails';
import TrackOrder from '../screens/trackOrder/TrackOrder';
import RateOrder from '../screens/rateOrder/RateOrder';

const Stack = createStackNavigator();

const OrderNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyOrder"
      screenOptions={{
        animationEnabled: false,
      }}>
      <Stack.Screen
        name="MyOrder"
        options={{headerShown: false}}
        children={() => <MyOrder />}
      />
      <Stack.Screen
        name="OrderDetails"
        options={{headerShown: false}}
        children={() => <OrderDetails />}
      />
      <Stack.Screen
        name="RateOrder"
        options={{headerShown: false}}
        children={() => <RateOrder />}
      />
      <Stack.Screen
        name="TrackOrder"
        options={{headerShown: false}}
        children={() => <TrackOrder />}
      />
    </Stack.Navigator>
  );
};

export default OrderNavigator;
