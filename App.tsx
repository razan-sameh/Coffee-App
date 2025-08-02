import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './src/screens/Splash';
import CustomOnboarding from './src/screens/CustomOnboarding';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import ForgetPassword from './src/screens/ForgetPassword';
import OTPVerification from './src/screens/OTPVerification';
import ResetPassword from './src/screens/ResetPassword';
import DrawerNavigator from './src/Navigation/DrawerNavigator';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {FavouriteProvider} from './src/provider/FavouriteProvider';

export const navigationRef: any = createNavigationContainerRef();
const Stack = createStackNavigator();

const App = () => {
  const [routeName, setRouteName] = useState<string>('');

  return (
    <Provider store={store}>
      <FavouriteProvider>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            setRouteName(navigationRef.getCurrentRoute().name);
          }}
          onStateChange={async () => {
            const currentRouteName = navigationRef.getCurrentRoute().name;
            setRouteName(currentRouteName);
          }}>
          <Stack.Navigator
            initialRouteName={'Splash'}
            screenOptions={{
              animationEnabled: false,
              headerShown: false,
            }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Onboarding" component={CustomOnboarding} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
            <Stack.Screen name="OTPVerification" component={OTPVerification} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen
              name="DrawerNavigator"
              children={() => <DrawerNavigator routeName={routeName} />}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FavouriteProvider>
    </Provider>
  );
};

export default App;
