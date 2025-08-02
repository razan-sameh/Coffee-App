import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import database from '@react-native-firebase/database';
type FavouriteState = {
  items: string[];
  loading: boolean;
  error: string | null;
};

const initialState: FavouriteState = {
  items: [],
  loading: false,
  error: null,
};

// favouriteSlice.ts
export const fetchFavourites = createAsyncThunk(
  'favourite/fetchFavourites',
  async (userId: string) => {
    const snapshot = await database().ref(`favourite/${userId}`).once('value');
    const data = snapshot.val();
    return data?.Products || [];
  },
);

export const addFavourite = createAsyncThunk(
  'favourite/addFavourite',
  async ({userId, productId}: {userId: string; productId: string}) => {
    const ref = database().ref(`favourite/${userId}`);
    const snapshot = await ref.once('value');
    const data = snapshot.val();
    const products = data?.Products || [];
    const updated = products.includes(productId)
      ? products
      : [...products, productId];
    await ref.set({Uid: userId, Products: updated});
    return productId;
  },
);

export const removeFavourite = createAsyncThunk(
  'favourite/removeFavourite',
  async ({userId, productId}: {userId: string; productId: string}) => {
    const ref = database().ref(`favourite/${userId}`);
    const snapshot = await ref.once('value');
    const data = snapshot.val();
    const updated = (data?.Products || []).filter(
      (id: string) => id !== productId,
    );
    await ref.set({Uid: userId, Products: updated});
    return productId;
  },
);

const favouriteSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFavourites.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchFavourites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch favourites';
      });
  },
});

export default favouriteSlice.reducer;
