import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {enmPaymentMethod, enmOrderType, enmPlatform} from '../../Content/Enums';
import {typOrderItem, typDeliveryInfo, typOrder} from '../../Content/Types';

const initialState: typOrder = {
  id: '',
  items: [],
  total: 0,
  paymentMethod: enmPaymentMethod.cash,
  orderType: enmOrderType.delivery,
  deliveryInfo: {
    name: '',
    address: '',
    phone: '',
  },
  userId: '',
  date: '',
  platform: enmPlatform.mobile,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderItems(state, action: PayloadAction<typOrderItem[]>) {
      state.items = action.payload;
    },
    setDeliveryInfo(state, action: PayloadAction<typDeliveryInfo>) {
      state.deliveryInfo = action.payload;
    },
    setPaymentMethod(state, action: PayloadAction<enmPaymentMethod>) {
      state.paymentMethod = action.payload;
    },
    setOrderType(state, action: PayloadAction<enmOrderType>) {
      state.orderType = action.payload;
    },
    setTotal(state, action: PayloadAction<number>) {
      state.total = action.payload;
    },
    setPlatform(state, action: PayloadAction<enmPlatform>) {
      state.platform = action.payload;
    },
    setDate(state, action: PayloadAction<string>) {
      state.date = action.payload;
    },
    resetOrder(state) {
      state.items = [];
      state.deliveryInfo = {
        name: '',
        address: '',
        phone: '',
      };
      state.paymentMethod = enmPaymentMethod.cash;
      state.orderType = enmOrderType.delivery;
      state.total = 0;
      state.platform = enmPlatform.mobile;
      state.date = '';
    },
  },
});

export const {
  setOrderItems,
  setDeliveryInfo,
  setPaymentMethod,
  setOrderType,
  setTotal,
  setPlatform,
  setDate,
  resetOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
