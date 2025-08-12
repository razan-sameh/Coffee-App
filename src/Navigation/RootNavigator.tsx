/* eslint-disable react/react-in-jsx-scope */
import {createStackNavigator} from '@react-navigation/stack';
import {useStartup} from '../provider/StartupProvider';
import CustomOnboarding from '../screens/CustomOnboarding';
import ForgetPassword from '../screens/forgetPassword/ForgetPassword';
import Login from '../screens/login/Login';
import OTPVerification from '../screens/otpVerification/OTPVerification';
import ResetPassword from '../screens/resetPassword/ResetPassword';
import SignUp from '../screens/signUp/SignUp';
import DrawerNavigator from './DrawerNavigator';
const Stack = createStackNavigator();
const RootNavigator = ({routeName}: {routeName: string}) => {
  const {isFirstLaunch, isAuthenticated} = useStartup();

  return (
    <Stack.Navigator
      initialRouteName={
        isFirstLaunch
          ? 'Onboarding'
          : isAuthenticated
          ? 'DrawerNavigator'
          : 'Login'
      }
      screenOptions={{animationEnabled: false, headerShown: false}}>
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
  );
};
export default RootNavigator;
