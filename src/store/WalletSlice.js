import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import w_service from "../appwrite/walletServices";

// 🔥 Async thunk: fetch all wallets for a user
export const fetchWallets = createAsyncThunk(
  "wallets/fetchWallets",
  async (user, { rejectWithValue }) => {
    try {     
      const res = await w_service.ListUserWallets(user);
      // If res has documents property (Appwrite default)
      const wallets = res.documents ? res.documents : res;

      return wallets; // always return array
    } catch (err) {
      console.error("Error fetching wallets:", err);
      return rejectWithValue(err.message || "Failed to fetch wallets");
    }
  }
);

const walletSlice = createSlice({
  name: "wallets",
  initialState: {
    wallets: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearWallets: (state) => {
      state.wallets = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWallets.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.wallets = [];
      })
      .addCase(fetchWallets.fulfilled, (state, action) => {
        state.loading = false;
        state.wallets = action.payload;
      })
      .addCase(fetchWallets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWallets } = walletSlice.actions;
export default walletSlice.reducer;