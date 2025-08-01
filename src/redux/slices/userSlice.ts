import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {typUser} from '../../Content/Types';
import {enmRole} from '../../Content/Enums';

const initialState: typUser = {
  Uid: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: [],
  address: [],
  password: '',
  role: enmRole.customer, // Assuming default value, replace as needed
  isActive: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUserID: (state, action: PayloadAction<string>) => {
      state.Uid = action.payload;
    },
    changeFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    changeLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    changeEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    changePhoneNumber: (state, action: PayloadAction<string[]>) => {
      state.phoneNumber = action.payload;
    },
    changeAddress: (state, action: PayloadAction<string[]>) => {
      state.address = action.payload;
    },
    changePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    changeRole: (state, action: PayloadAction<enmRole>) => {
      state.role = action.payload;
    },
    changeActiveStatus: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
    resetUser: () => initialState,
  },
});

export const {
  changeUserID,
  changeFirstName,
  changeLastName,
  changeEmail,
  changePhoneNumber,
  changeAddress,
  changePassword,
  changeRole,
  changeActiveStatus,
  resetUser,
} = userSlice.actions;

export default userSlice.reducer;
