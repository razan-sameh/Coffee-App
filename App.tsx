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

export const navigationRef: any = createNavigationContainerRef();
// export const serverURL = 'http://localhost:3000';
export const serverURL = 'http://192.168.1.4:3000';

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
                <NavigationContainer
                  ref={navigationRef}
                  onReady={() => {
                    setRouteName(navigationRef.getCurrentRoute()?.name || '');
                  }}
                  onStateChange={() => {
                    const current = navigationRef.getCurrentRoute()?.name;
                    setRouteName(current || '');
                  }}>
                  <RootNavigator routeName={routeName} />
                </NavigationContainer>
              </FavouriteProvider>
            </LocationProvider>
          </NotificationProvider>
        </AuthStartupProvider>
      </StripeProvider>
    </Provider>
  );
};

export default App;
