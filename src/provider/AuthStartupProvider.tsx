// src/provider/StartupProvider.tsx
import React, {useEffect, useState, createContext, useContext} from 'react';
import BootSplash from 'react-native-bootsplash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {fetchUserInfo} from '../redux/slices/userSlice';
import {useAppDispatch} from '../redux/store';
import {requestUserPermission} from '../services/notifications';

type AuthStartupContextType = {
  isFirstLaunch: boolean;
  isAuthenticated: boolean;
};

const AuthStartupContext = createContext<AuthStartupContextType | null>(null);

export const AuthStartupProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;
    let unsubscribeAuth: (() => void) | undefined;
    let hasInitialized = false; // Prevent multiple initializations

    const hideSplashScreen = async () => {
      try {
        await BootSplash.hide({fade: true});
      } catch (error) {
        console.error('Error hiding splash:', error);
        try {
          await BootSplash.hide();
        } catch (fallbackError) {
          console.error('Fallback splash hide failed:', fallbackError);
        }
      }
    };

    const initializeApp = async () => {
      try {
        // Start both operations in parallel for faster initialization
        const [hasLaunched, authStatePromise] = await Promise.all([
          AsyncStorage.getItem('hasLaunched'),
          new Promise<FirebaseAuthTypes.User | null>(resolve => {
            // Get the current auth state immediately, then set up listener
            const currentUser = auth().currentUser;
            if (currentUser !== null) {
              resolve(currentUser);
              return;
            }

            // If no current user, wait for auth state change
            const unsubscribe = auth().onAuthStateChanged(user => {
              unsubscribe(); // Unsubscribe immediately after first call
              resolve(user);
            });
          }),
        ]);

        if (!mounted) {
          return;
        }

        // Handle first launch
        if (!hasLaunched) {
          setIsFirstLaunch(true);
          AsyncStorage.setItem('hasLaunched', 'true'); // Don't await this
        }

        // Handle auth state
        const authUser = authStatePromise;

        setIsAuthenticated(!!authUser);

        if (authUser) {
          // Start these operations but don't wait for them
          dispatch(fetchUserInfo(authUser.uid));
          requestUserPermission().catch(error =>
            console.warn('Permission request failed:', error),
          );
        }

        // Now set up the persistent listener for future auth changes
        unsubscribeAuth = auth().onAuthStateChanged(user => {
          if (mounted && hasInitialized) {
            setIsAuthenticated(!!user);

            if (user && !isAuthenticated) {
              // User just logged in
              dispatch(fetchUserInfo(user.uid));
              requestUserPermission().catch(error =>
                console.warn('Permission request failed:', error),
              );
            }
          }
        });

        hasInitialized = true;
        setIsLoading(false);

        // Small delay for smooth transition
        setTimeout(() => {
          hideSplashScreen();
        }, 150);
      } catch (error) {
        console.error('Startup initialization error:', error);
        if (mounted) {
          setIsLoading(false);
          hideSplashScreen();
        }
      }
    };

    initializeApp();

    return () => {
      mounted = false;
      if (unsubscribeAuth) {
        unsubscribeAuth();
      }
    };
  }, [dispatch, isAuthenticated]);

  // Keep splash visible until loading is complete
  if (isLoading) {
    return null;
  }

  return (
    <AuthStartupContext.Provider
      value={{
        isFirstLaunch,
        isAuthenticated,
      }}>
      {children}
    </AuthStartupContext.Provider>
  );
};

export const useAuthStartup = () => {
  const context = useContext(AuthStartupContext);
  if (!context) {
    throw new Error('useAuthStartup must be used within AuthStartupProvider');
  }
  return context;
};
