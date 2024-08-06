import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { typUser } from '../Content/Types'

const initialState: typUser = {
    Uid: '',
    name: '',
    phoneNumber: '',
    address: '',
    password:''
}
export const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        changeUserID: (state,action: PayloadAction<string>) => {
            state.Uid = action.payload;
        },
        changeName: (state,action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        changePhoneNumber: (state,action: PayloadAction<string>) => {
            state.phoneNumber = action.payload;
        },
        changeAddress: (state,action: PayloadAction<string>) => {
            state.address = action.payload;
        },
        changePassword: (state,action: PayloadAction<string>) => {
            state.password = action.payload;
        }
    }
})

export const { changeUserID,changeName,changePhoneNumber,changeAddress,changePassword } = userSlice.actions

export default userSlice.reducer