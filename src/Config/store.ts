import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../Config/userSlice'

export const store = configureStore({
    reducer: {
        user: userReducer
    },
    middleware: undefined
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;