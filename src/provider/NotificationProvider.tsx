// src/providers/NotificationProvider.tsx
import React, {useEffect} from 'react';
import {
  requestUserPermission,
  listenToForegroundMessages,
} from '../services/notifications';

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    const setupNotifications = async () => {
      await requestUserPermission();

      const unsubscribe = listenToForegroundMessages(message => {
        console.log('🚀 Message received in NotificationProvider:', message);
        // Optionally: show Toast or custom UI
      });

      // Return cleanup function
      return unsubscribe;
    };

    let unsubscribeFn: (() => void) | undefined;
    setupNotifications().then(fn => {
      unsubscribeFn = fn;
    });

    return () => {
      if (unsubscribeFn) {
        unsubscribeFn();
      }
    };
  }, []);

  return <>{children}</>;
};
