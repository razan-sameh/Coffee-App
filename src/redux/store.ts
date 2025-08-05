import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import userReducer from './slices/userSlice';
import filterReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import favouriteReducer from './slices/favouriteSlice';
import orderReducer from './slices/orderSlice'; // ✅ new
import {firebaseApi} from '../services/firebaseApi';

// ─── Persist Config ─────────────────────────────
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['order'], // ✅ persist only what you need
};

// ─── Combine Reducers ──────────────────────────
const rootReducer = combineReducers({
  user: userReducer,
  filter: filterReducer,
  cart: cartReducer,
  favourite: favouriteReducer,
  order: orderReducer, // ✅ new
  [firebaseApi.reducerPath]: firebaseApi.reducer,
});

// ─── Persisted Reducer ─────────────────────────
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ─── Store Configuration ───────────────────────
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }).concat(firebaseApi.middleware),
});

// ─── Persistor Export (for <PersistGate>) ───────
export const persistor = persistStore(store);

// ─── Types ──────────────────────────────────────
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
