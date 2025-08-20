// redux/slices/userSlice.ts
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {typLocation, typUser} from '../../Content/Types';
import {enmRole} from '../../Content/Enums';
import {createUser} from '../../services/cartServices';
import {
  getUserById,
  changeUserPassword,
  updateUserProfile,
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
export const updateUserProfileAsync = createAsyncThunk(
  'user/updateUserProfile',
  async ({
    Uid,
    firstName,
    lastName,
    address,
    phoneNumber,
  }: {
    Uid: string;
    firstName?: string;
    lastName?: string;
    address?: typLocation[]; // ✅ make it array
    phoneNumber?: string[]; // ✅ make it array
  }) => {
    await updateUserProfile({
      Uid,
      firstName,
      lastName,
      address,
      phoneNumber,
    });
    return {firstName, lastName, address, phoneNumber};
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
      .addCase(updateUserProfileAsync.fulfilled, (state, action) => {
        if (state.user) {
          const {firstName, lastName, address, phoneNumber} = action.payload;

          if (firstName) {
            state.user.firstName = firstName;
          }
          if (lastName) {
            state.user.lastName = lastName;
          }
          if (address) {
            state.user.address = address; // ✅ replace with full array
          }
          if (phoneNumber) {
            state.user.phoneNumber = phoneNumber; // ✅ replace with full array
          }
        }
      });
  },
});

export const {clearUser} = userSlice.actions;
export default userSlice.reducer;
