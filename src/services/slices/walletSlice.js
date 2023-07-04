import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wallet: {},
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = walletSlice.actions;

export default walletSlice.reducer;
