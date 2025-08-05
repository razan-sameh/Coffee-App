// AuthProvider.tsx
import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {fetchUserInfo} from '../redux/slices/userSlice';
import {useAppDispatch} from '../redux/store';

const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(fetchUserInfo(user.uid));
      }
    });

    return unsubscribe; // unsubscribe on unmount
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
