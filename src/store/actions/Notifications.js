import { createAsyncThunk } from "@reduxjs/toolkit";

export const activateToast = createAsyncThunk(
  "notificationsStore/activateToast",
  async (dataForToast) => {
    return dataForToast;
  }
);

export const activateSpinner = createAsyncThunk(
  "notificationStore/activateSpinner",
  async (spinnerState) => {
    return spinnerState;
  }
);
