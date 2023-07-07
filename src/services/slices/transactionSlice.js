import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transaction: [],
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransaction: (state, action) => {
      state.transaction = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
