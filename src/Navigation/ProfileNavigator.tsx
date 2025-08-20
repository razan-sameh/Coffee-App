import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../screens/profile/Profile';
import EditProfile from '../screens/editProfile/EditProfile';

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
        name="EditProfile"
        options={{headerShown: false}}
        children={() => <EditProfile />}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
