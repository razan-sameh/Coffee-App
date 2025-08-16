import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../screens/profile/Profile';
import Phone from '../screens/phone/Phone';
import Address from '../screens/Address';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        animationEnabled: false,
      }}>
      <Stack.Screen
        name="Profile"
        options={{headerShown: false}}
        children={() => <Profile />}
      />
      <Stack.Screen
        name="Phone"
        options={{headerShown: false}}
        children={() => <Phone />}
      />
      <Stack.Screen
        name="Address"
        options={{headerShown: false}}
        children={() => <Address />}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
