import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import walletSlice from "./slices/walletSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    wallet: walletSlice,
  },
});
