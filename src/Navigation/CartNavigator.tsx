import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Cart} from '../screens/Cart/Cart';
import CheckOut from '../screens/CheckOut';
import {Payment} from '../screens/Payment';

const Stack = createStackNavigator();

const CartNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Cart"
      screenOptions={{
        animationEnabled: false,
      }}>
      <Stack.Screen
        name="Cart"
        options={{headerShown: false}}
        children={() => <Cart />}
      />
      <Stack.Screen
        name="CheckOut"
        options={{headerShown: false}}
        children={() => <CheckOut />}
      />
      <Stack.Screen
        name="Payment"
        options={{headerShown: false}}
        children={() => <Payment />}
      />
    </Stack.Navigator>
  );
};

export default CartNavigator;
