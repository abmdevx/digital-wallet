import { createSlice } from "@reduxjs/toolkit";
import { clearWallets } from "./WalletSlice";
import { fetchWallets } from "./WalletSlice";

const initialState = {
    status: false,
    userData: null,
    loading: true,   // <--- initially true until we check session
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
            state.loading = false; // <--- set loading to false on login
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.loading = false; // <--- set loading to false on logout
        },
        finishLoading: (state) => {
            state.loading = false; // call this when session check finishes
        },
    }
});

export const {login, logout , finishLoading} = authSlice.actions;

// ✅ custom thunk for login + fetching wallets
export const performLogin = (userData) => async (dispatch) => {
  dispatch(login(userData));
  if (userData?.$id) {
    dispatch(fetchWallets({ UserId: userData.$id }));
  }
};

export default authSlice.reducer;