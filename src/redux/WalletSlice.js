import { createSlice } from "@reduxjs/toolkit"; //createSlice function is used to create a Redux slice named userSlice.

export const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    wallet: 0,
  },
  reducers: {
    setWallet: (state, action) => {
      state.wallet = action.payload;
    },
  },
});

export const { setWallet } = walletSlice.actions;
