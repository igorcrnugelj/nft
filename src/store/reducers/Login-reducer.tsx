import { createSlice } from "@reduxjs/toolkit";
import {
  getNonce,
  setMetaMaskWalletAddress,
  createUser,
  getJwtToken,
} from "../actions/LoginActions";

export const loginSlice = createSlice({
  name: "loginStore",
  initialState: {
    nonce: null,
    walletAddress: null,
    user: null,
  },
  reducers: {},
  extraReducers: {
    [getNonce.pending as any]: (state: any) => {
      state.loading = true;
    },
    [getNonce.fulfilled as any]: (state: any, action: any) => {
      state.loading = false;
      state.nonce = action.payload;
    },
    [getNonce.rejected as any]: (state: any) => {
      state.loading = false;
    },

    [setMetaMaskWalletAddress.fulfilled as any]: (state: any, action: any) => {
      state.walletAddress = action.payload;
    },

    [createUser.pending as any]: (state: any) => {
      state.loading = true;
    },
    [createUser.fulfilled as any]: (state: any, action: any) => {
      state.loading = false;
      state.user = action.payload;
    },
    [createUser.rejected as any]: (state: any) => {
      state.loading = false;
    },

    [getJwtToken.pending as any]: (state: any) => {
      state.loading = true;
    },
    [getJwtToken.fulfilled as any]: (state: any, action: any) => {
      state.loading = false;
      state.user = action.payload;
    },
    [getJwtToken.rejected as any]: (state: any) => {
      state.loading = false;
    },
  },
});

export const loginReducer = loginSlice.reducer;
