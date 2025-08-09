import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import filterReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import favouriteReducer from './slices/favouriteSlice';
import deliveryInfoReducer from './slices/deliveryInfoSlice';
import ordersReducer from './slices/ordersSlice';
import {firebaseApi} from '../services/firebaseApi';
import {useDispatch} from 'react-redux';

export const store = configureStore({
  reducer: {
    user: userReducer,
    filter: filterReducer,
    cart: cartReducer,
    favourite: favouriteReducer,
    deliveryInfo: deliveryInfoReducer,
    orders: ordersReducer,
    [firebaseApi.reducerPath]: firebaseApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(firebaseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
