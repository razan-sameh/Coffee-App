/* eslint-disable react/react-in-jsx-scope */
import {createStackNavigator} from '@react-navigation/stack';
import {useAuthStartup} from '../provider/AuthStartupProvider'; // Match your actual import path
import CustomOnboarding from '../screens/CustomOnboarding';
import ForgetPassword from '../screens/forgetPassword/ForgetPassword';
import Login from '../screens/login/Login';
import OTPVerification from '../screens/otpVerification/OTPVerification';
import ResetPassword from '../screens/resetPassword/ResetPassword';
import SignUp from '../screens/signUp/SignUp';
import DrawerNavigator from './DrawerNavigator';
import LocationPicker from '../screens/LocationPicker';

const Stack = createStackNavigator();

const RootNavigator = ({routeName}: {routeName: string}) => {
  const {isFirstLaunch, isAuthenticated} = useAuthStartup(); // Updated hook

  // Optional: Show loading screen while auth state is being determined
  // if (isLoading) {
  //   return <LoadingScreen />; // You can create a loading component if needed
  // }

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
      <Stack.Screen
        name="LocationPicker"
        component={LocationPicker}
        options={{
          presentation: 'modal', // optional: present as modal
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
