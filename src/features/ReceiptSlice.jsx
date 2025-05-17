import { createSlice } from '@reduxjs/toolkit';

export const receiptSlice = createSlice({
  name: 'receipt',
  initialState: {
    lastReceipt: null
  },
  reducers: {
    setLastOrderReceipt: (state, action) => {
      state.lastReceipt = action.payload;
    },
    clearLastOrderReceipt: (state) => {
      state.lastReceipt = null;
    }
  }
});

export const { setLastOrderReceipt, clearLastOrderReceipt } = receiptSlice.actions;

export const selectLastOrderReceipt = (state) => state.receipt.lastReceipt;

export default receiptSlice.reducer;
