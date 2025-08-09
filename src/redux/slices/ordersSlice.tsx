import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {typOrder} from '../../Content/Types';
import {
  addOrderToFirebase,
  getOrderByIdFromFirebase,
  getOrdersByUserIdFromFirebase,
} from '../../services/orderService';

interface OrderState {
  orders: typOrder[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

// ✅ Add order
export const addOrder = createAsyncThunk(
  'orders/addOrder',
  async (order: Omit<typOrder, 'id' | 'platform' | 'orderType' | 'date'>) => {
    return await addOrderToFirebase(order);
  },
);

// ✅ Get orders by user ID
export const fetchOrdersByUserId = createAsyncThunk(
  'orders/fetchOrdersByUserId',
  async (uid: string) => {
    return await getOrdersByUserIdFromFirebase(uid);
  },
);

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId: string) => {
    return await getOrderByIdFromFirebase(orderId);
  },
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addOrder.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to add order';
      })

      .addCase(fetchOrdersByUserId.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch orders';
      });
  },
});

export default orderSlice.reducer;
