import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TapNavigator from './src/Navigation/TapNavigator';
import  Splash  from './src/screens/Splash';
import CustomOnboarding from './src/screens/CustomOnboarding';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import auth from '@react-native-firebase/auth';

const ref: any = createNavigationContainerRef();
const Stack = createStackNavigator();

const App = () => {
  const [routeName, setRouteName] = useState<string>('');
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  // function onAuthStateChanged(user : any) {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  // if (initializing) return setRouteName("TapNavigator");

  // if (!user) return setRouteName("Splash")

  return (
    <NavigationContainer
      ref={ref}
      onReady={() => {
        setRouteName(ref.getCurrentRoute().name)
      }}
      onStateChange={async () => {
        const previousRouteName = routeName;
        const currentRouteName = ref.getCurrentRoute().name;
        setRouteName(currentRouteName);
      }}>
      <Stack.Navigator
        initialRouteName='SignUp'
        screenOptions={{
          animationEnabled: false,
          headerShown:false
        }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Onboarding" component={CustomOnboarding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="TapNavigator"
        children={(navigation) => <TapNavigator {...navigation} routeName={routeName} />}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
