import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getNonce = createAsyncThunk(
  "loginStore/getNonce",
  async (metamaskPublicAddress: any) => {
    try {
      const res = await axios({
        url: `https://5utv6u04h0.execute-api.us-east-1.amazonaws.com/dev/user/address?publicAddress=${metamaskPublicAddress}`,
        method: "GET",
      });
      if (res.status >= 200 || res.status < 300) {
        return {
          success: true,
          data: res.data,
        };
      } else {
        return {
          success: false,
          data: res.statusText,
        };
      }
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }
);
export const setMetaMaskWalletAddress = createAsyncThunk(
  "loginStore/setMetaMaskWalletAddress",
  async (walletAddress: any) => {
    return walletAddress;
  }
);
export const createUser = createAsyncThunk(
  "loginStore/createUser",
  async (metamaskPublicAddress: any) => {
    try {
      const res = await axios({
        url: "https://5utv6u04h0.execute-api.us-east-1.amazonaws.com/dev/user/createUser",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: metamaskPublicAddress,
      });
      if (res.status >= 200 || res.status < 300) {
        return {
          success: true,
          data: res.data,
        };
      } else {
        return {
          success: false,
          data: res.statusText,
        };
      }
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }
);
export const getJwtToken = createAsyncThunk(
  "loginStore/getJwtToken",
  async (dataForJwtToken: any) => {
    try {
      const res = await axios({
        url: "https://5utv6u04h0.execute-api.us-east-1.amazonaws.com/dev/auth/metamask-login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: dataForJwtToken,
      });
      if (res.status >= 200 || res.status < 300) {
        return {
          success: true,
          data: res.data,
        };
      } else {
        return {
          success: false,
          data: res.statusText,
        };
      }
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }
);
export const refreshUser = createAsyncThunk(
  "loginStore/refreshUser",
  async (userFromLocalStorage: any) => {
    return userFromLocalStorage;
  }
);
