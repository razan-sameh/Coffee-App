// redux/slices/userSlice.ts
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {typUser} from '../../Content/Types';
import {enmRole} from '../../Content/Enums';
import {createUser} from '../../services/cartServices';
import {
  getUserById,
  changeUserPassword,
  addUserDetailsToFirebase,
} from '../../services/userServices';

type UserState = {
  user: typUser | null;
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

// ─────────────── Async Thunks ───────────────

// Add new user
export const addUserAsync = createAsyncThunk(
  'user/addUser',
  async ({
    Uid,
    firstName,
    lastName,
    email,
    password,
  }: {
    Uid: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    await createUser(Uid, firstName, lastName, email, password);
    return {
      Uid,
      firstName,
      lastName,
      email,
      password,
    };
  },
);

// Fetch user by UID
export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async (Uid: string) => {
    const user = await getUserById(Uid);
    return user;
  },
);

// Update password
export const updateUserPassword = createAsyncThunk(
  'user/updateUserPassword',
  async ({Uid, newPassword}: {Uid: string; newPassword: string}) => {
    await changeUserPassword(Uid, newPassword);
    return newPassword;
  },
);

// Add address/phone number
export const addUserDetails = createAsyncThunk(
  'user/addUserDetails',
  async ({
    Uid,
    address,
    phoneNumber,
  }: {
    Uid: string;
    address?: string;
    phoneNumber?: string;
  }) => {
    // Don’t call if both are undefined
    if (!address && !phoneNumber) {
      throw new Error(
        'At least one of address or phoneNumber must be provided',
      );
    }

    await addUserDetailsToFirebase(Uid, address, phoneNumber);

    return {address, phoneNumber};
  },
);

// ─────────────── Slice ───────────────

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: state => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.user = {
          Uid: action.payload.Uid,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          password: action.payload.password,
          phoneNumber: [],
          role: enmRole.customer,
          isActive: true,
        };
      })
      .addCase(fetchUserInfo.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.error = action.error.message ?? 'Error fetching user info';
        state.loading = false;
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        if (state.user) {
          state.user.password = action.payload;
        }
      })
      .addCase(addUserDetails.fulfilled, (state, action) => {
        if (state.user) {
          const {address, phoneNumber} = action.payload;

          if (!state.user.address) {
            state.user.address = [];
          }
          if (!state.user.phoneNumber) {
            state.user.phoneNumber = [];
          }

          if (address && !state.user.address.includes(address)) {
            state.user.address.push(address);
          }

          if (phoneNumber && !state.user.phoneNumber.includes(phoneNumber)) {
            state.user.phoneNumber.push(phoneNumber);
          }
        }
      });
  },
});

export const {clearUser} = userSlice.actions;
export default userSlice.reducer;
