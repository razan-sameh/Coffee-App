import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {typCart} from '../../Content/Types';
import {
  getCartItems,
  addItemInCart,
  removeItemFromCart,
  updateItemInCart,
  decreaseCountItemInCart,
} from '../../Content/Database';
import {enmSize} from '../../Content/Enums';

type CartState = {
  items: typCart[];
  loading: boolean;
  error: string | null;
};

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (Uid: string, {rejectWithValue}) => {
    try {
      const data = await getCartItems(Uid); // must return typCart[]
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

export const updateCartItemFirebase = createAsyncThunk(
  'cart/updateCartItemFirebase',
  async (
    {
      Uid,
      productID,
      oldSize,
      newSize,
      newCount,
    }: {
      Uid: string;
      productID: string;
      oldSize: enmSize;
      newSize: enmSize;
      newCount: number;
    },
    {rejectWithValue},
  ) => {
    try {
      const {price} = await updateItemInCart(
        Uid,
        productID,
        oldSize,
        newSize,
        newCount,
      ); // return price
      return {
        Uid, // ✅ add Uid to return
        productID,
        size: newSize,
        count: newCount,
        price,
      };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

export const addToCartFirebase = createAsyncThunk(
  'cart/addToCartFirebase',
  async (
    {
      Uid,
      productID,
      size,
      count,
      price, // ✅ add price
    }: {
      Uid: string;
      productID: string;
      size: enmSize;
      count: number;
      price: number;
    },
    {rejectWithValue},
  ) => {
    try {
      await addItemInCart(Uid, productID, size, count); // your DB save
      return {Uid, productID, size, count, price}; // ✅ include price in return
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

export const decreaseFromCartFirebase = createAsyncThunk(
  'cart/decreaseFromCartFirebase',
  async (
    {Uid, productID, size}: {Uid: string; productID: string; size: enmSize},
    {rejectWithValue},
  ) => {
    try {
      const result = await decreaseCountItemInCart(Uid, productID, size);
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const removeFromCartFirebase = createAsyncThunk(
  'cart/removeFromCartFirebase',
  async (
    {Uid, productID, size}: {Uid: string; productID: string; size: enmSize},
    {rejectWithValue},
  ) => {
    try {
      await removeItemFromCart(Uid, productID as any, size);
      return {productID, size};
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: state => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCart.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCart.fulfilled,
        (state, action: PayloadAction<typCart[]>) => {
          state.items = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder.addCase(removeFromCartFirebase.fulfilled, (state, action) => {
      state.items = state.items.filter(
        item =>
          !(
            item.productID === action.payload.productID &&
            item.size === action.payload.size
          ),
      );
    });
    builder.addCase(addToCartFirebase.fulfilled, (state, action) => {
      const {productID, size, count, Uid, price} = action.payload;
      const existing = state.items.find(
        item => item.productID === productID && item.size === size,
      );
      if (existing) {
        existing.count = count;
      } else {
        state.items.push({
          productID,
          size,
          count,
          Uid,
          price,
        });
      }
    });
    builder.addCase(updateCartItemFirebase.fulfilled, (state, action) => {
      const {productID, size, count, price, Uid} = action.payload;
      const existing = state.items.find(
        item => item.productID === productID && item.size === size,
      );
      if (existing) {
        existing.count = count;
        existing.price = price;
      } else {
        state.items.push({
          productID,
          size,
          count,
          price,
          Uid,
        });
      }
    });

    builder.addCase(decreaseFromCartFirebase.fulfilled, (state, action) => {
      const {productID, size, count, price} = action.payload;
      const existing = state.items.find(
        item => item.productID === productID && item.size === size,
      );
      if (existing) {
        existing.count = count;
        existing.price = price;
      }
    });
  },
});

export const {clearCart} = cartSlice.actions;
export default cartSlice.reducer;
