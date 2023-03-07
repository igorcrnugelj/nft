import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getNonce = createAsyncThunk(
  "loginStore/getNonce",
  async (metamaskPublicAddress: any) => {
    try {
      const { data } = await axios({
        url: `https://5utv6u04h0.execute-api.us-east-1.amazonaws.com/dev/user/address?publicAddress=${metamaskPublicAddress}`,
        method: "GET",
      });
      return { data, success: true };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }
);

export const createUser = createAsyncThunk(
  "loginStore/createUser",
  async (metamaskPublicAddress: any) => {
    try {
      const { data } = await axios({
        url: "https://5utv6u04h0.execute-api.us-east-1.amazonaws.com/dev/user/createUser",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: metamaskPublicAddress,
      });
      return { data, success: true };
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
      const { data } = await axios({
        url: "https://5utv6u04h0.execute-api.us-east-1.amazonaws.com/dev/auth/metamask-login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: dataForJwtToken,
      });
      return { data, success: true };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }
);
export const setUser = createAsyncThunk(
  "loginStore/setUser",
  async (userFromLocalStorage: any) => {
    return userFromLocalStorage;
  }
);
export const setUnauthorizedError = createAsyncThunk(
  "loginStore/setUnauthorizedError",
  async (unauthorizedErrorData: any) => {
    return unauthorizedErrorData;
  }
);
