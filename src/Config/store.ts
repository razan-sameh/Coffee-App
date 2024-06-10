import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../Config/userSlice'

export default configureStore({
    reducer: {
        user: userReducer

    }
})