import { createSlice } from "@reduxjs/toolkit";
import {
  getNonce,
  setMetaMaskWalletAddress,
  createUser,
  getJwtToken,
} from "../actions/Login";

export const loginSlice = createSlice({
  name: "loginStore",
  initialState: {
    nonce: null,
    walletAddress: null,
    user: null,
  },
  reducers: {},
  extraReducers: {
    [getNonce.pending]: (state) => {
      state.loading = true;
    },
    [getNonce.fulfilled]: (state, action) => {
      state.loading = false;
      state.nonce = action.payload;
    },
    [getNonce.rejected]: (state) => {
      state.loading = false;
    },

    [setMetaMaskWalletAddress.fulfilled]: (state, action) => {
      state.walletAddress = action.payload;
    },

    [createUser.pending]: (state) => {
      state.loading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [createUser.rejected]: (state) => {
      state.loading = false;
    },

    [getJwtToken.pending]: (state) => {
      state.loading = true;
    },
    [getJwtToken.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [getJwtToken.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const loginReducer = loginSlice.reducer;
