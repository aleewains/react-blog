import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;

// 2. Extract the 'AppDispatch' type
export type AppDispatch = typeof store.dispatch;
