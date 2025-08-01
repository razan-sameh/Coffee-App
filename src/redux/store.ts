import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import filterReducer from './slices/filterSlice';
import {firebaseApi} from '../services/firebaseApi';

export const store = configureStore({
  reducer: {
    user: userReducer,
    filter: filterReducer,
    [firebaseApi.reducerPath]: firebaseApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(firebaseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
