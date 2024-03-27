import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TapNavigator from './src/Navigation/TapNavigator';
import  Splash  from './src/screens/Splash';
import Onboarding from './src/screens/CustomOnboarding';

const ref: any = createNavigationContainerRef();
const Stack = createStackNavigator();

const App = () => {
  const [routeName, setRouteName] = useState<string>('');

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
        initialRouteName='Splash'
        screenOptions={{
          animationEnabled: false,
          headerShown:false
        }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="TapNavigator"
        children={(navigation) => <TapNavigator {...navigation} routeName={routeName} />}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
