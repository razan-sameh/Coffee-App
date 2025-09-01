import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import React, {useState} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {FavouriteProvider} from './src/provider/FavouriteProvider';
import {StripeProvider} from '@stripe/stripe-react-native';
import {NotificationProvider} from './src/provider/NotificationProvider';
import {AuthStartupProvider} from './src/provider/AuthStartupProvider';
import RootNavigator from './src/Navigation/RootNavigator';
import {LocationProvider} from './src/provider/LocationProvider';
import {StatusBar} from 'react-native';
import {strSecondColor} from './src/styles/responsive';
import {OrderProvider} from './src/provider/OrderProvider';

export const navigationRef: any = createNavigationContainerRef();
// export const serverURL = 'http://localhost:3000';
export const serverURL = 'https://coffee-server-ivory-omega.vercel.app/api';

const App = () => {
  const [routeName, setRouteName] = useState<string>('');
  const publishableKey =
    'pk_test_51NCM93L3kg8UzIW5XyFsKYQA1zGQK1nxXsMcZLPM6lU2584BYmXtq9eNONB05bVPoH0BK0osdEruluXRUEY3ey2t00KFECBVTc';

  // Remove the useEffect that calls SplashScreen.hide()

  return (
    <Provider store={store}>
      <StripeProvider publishableKey={publishableKey}>
        <AuthStartupProvider>
          <NotificationProvider>
            <LocationProvider>
              <FavouriteProvider>
                <OrderProvider>
                  <NavigationContainer
                    ref={navigationRef}
                    onReady={() => {
                      setRouteName(navigationRef.getCurrentRoute()?.name || '');
                    }}
                    onStateChange={() => {
                      const current = navigationRef.getCurrentRoute()?.name;
                      setRouteName(current || '');
                    }}>
                    <StatusBar
                      backgroundColor={strSecondColor} // your theme color
                      barStyle="light-content" // "light-content" or "dark-content"
                    />
                    <RootNavigator routeName={routeName} />
                  </NavigationContainer>
                </OrderProvider>
              </FavouriteProvider>
            </LocationProvider>
          </NotificationProvider>
        </AuthStartupProvider>
      </StripeProvider>
    </Provider>
  );
};

export default App;
