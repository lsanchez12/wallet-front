import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wallet: null,
  balance: null,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWallet: (state, action) => {
      state.wallet = action.payload.wallet_uuid;
    },
    setBalance: (state, action) => {
      state.balance = action.payload.balance;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBalance, setWallet } = walletSlice.actions;

export default walletSlice.reducer;
