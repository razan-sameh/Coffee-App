import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import filterReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import {firebaseApi} from '../services/firebaseApi';
import {useDispatch} from 'react-redux';

export const store = configureStore({
  reducer: {
    user: userReducer,
    filter: filterReducer,
    cart: cartReducer,
    [firebaseApi.reducerPath]: firebaseApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(firebaseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
