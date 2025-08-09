import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {typDeliveryInfo} from '../../Content/Types';

const initialState: typDeliveryInfo = {
  name: '',
  address: '',
  phone: '',
};

const orderSlice = createSlice({
  name: 'deliveryInfo',
  initialState,
  reducers: {
    setDeliveryInfo(_, action: PayloadAction<typDeliveryInfo>) {
      return action.payload; // Replace whole state
    },
    resetDeliveryInfo() {
      return initialState; // Reset to default
    },
  },
});

export const {setDeliveryInfo, resetDeliveryInfo} = orderSlice.actions;

export default orderSlice.reducer;
