import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import React, {useState} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {FavouriteProvider} from './src/provider/FavouriteProvider';
import AuthProvider from './src/provider/AuthProvider';
import {StripeProvider} from '@stripe/stripe-react-native';
import {NotificationProvider} from './src/provider/NotificationProvider';
import {StartupProvider} from './src/provider/StartupProvider';
import RootNavigator from './src/Navigation/RootNavigator';
// Remove this import and call - handle it in StartupProvider instead
// import SplashScreen from 'react-native-splash-screen';

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
        <AuthProvider>
          <NotificationProvider>
            <FavouriteProvider>
              <StartupProvider>
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
              </StartupProvider>
            </FavouriteProvider>
          </NotificationProvider>
        </AuthProvider>
      </StripeProvider>
    </Provider>
  );
};

export default App;
