import { createSlice } from "@reduxjs/toolkit";
import { setNftClientToken } from "../../AxiosClient";
import {
  getNonce,
  setMetaMaskWalletAddress,
  createUser,
  getJwtToken,
  refreshUser,
  setUnauthorizedError,
} from "../actions/LoginActions";

export const loginSlice = createSlice({
  name: "loginStore",
  initialState: {
    nonce: null,
    walletAddress: null,
    user: null,
    unauthorizedErrorData: null,
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
    },
    [createUser.rejected as any]: (state: any) => {
      state.loading = false;
    },

    [getJwtToken.pending as any]: (state: any) => {
      state.loading = true;
    },
    [getJwtToken.fulfilled as any]: (state: any, action: any) => {
      state.loading = false;
      state.user = action.payload.data;
      setNftClientToken(state.user.token);
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    [getJwtToken.rejected as any]: (state: any) => {
      state.loading = false;
    },

    [refreshUser.fulfilled as any]: (state: any, action: any) => {
      state.user = action.payload;
      setNftClientToken(state.user.token);
    },

    [setUnauthorizedError.fulfilled as any]: (state: any, action: any) => {
      state.unauthorizedErrorData = action.payload;
    },
  },
});

export const loginReducer = loginSlice.reducer;
