// src/provider/StartupProvider.tsx
import React, {useEffect, useState, createContext, useContext} from 'react';
import BootSplash from 'react-native-bootsplash';
import AsyncStorage from '@react-native-async-storage/async-storage';

type StartupContextType = {
  isFirstLaunch: boolean;
  isAuthenticated: boolean;
};

const StartupContext = createContext<StartupContextType | null>(null);

export const StartupProvider = ({children}: {children: React.ReactNode}) => {
  const [loading, setLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        // Add a small delay to ensure splash screen shows briefly
        await new Promise(resolve => setTimeout(resolve, 1000));

        // First launch check
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (!hasLaunched) {
          setIsFirstLaunch(true);
          await AsyncStorage.setItem('hasLaunched', 'true');
        }

        // Authentication check
        const token = await AsyncStorage.getItem('authToken');
        setIsAuthenticated(!!token);

        // Small delay before hiding splash to prevent flash
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (error) {
        console.error('Startup error:', error);
      } finally {
        if (mounted) {
          setLoading(false);
          // Hide splash screen only once, after everything is ready
          await BootSplash.hide({fade: true});
        }
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, []);

  // Keep splash visible until loading is complete
  if (loading) {
    return null; // Native splash stays visible
  }

  return (
    <StartupContext.Provider value={{isFirstLaunch, isAuthenticated}}>
      {children}
    </StartupContext.Provider>
  );
};

export const useStartup = () => {
  const context = useContext(StartupContext);
  if (!context)
    throw new Error('useStartup must be used within StartupProvider');
  return context;
};
