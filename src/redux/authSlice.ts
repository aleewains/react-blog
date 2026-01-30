import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface AuthState {
  status: boolean;
  userData: any; // Replace 'any' with a User interface
}
const initialState: AuthState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
