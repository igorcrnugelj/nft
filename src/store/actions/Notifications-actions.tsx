import { createAsyncThunk } from "@reduxjs/toolkit";

export const activateToast = createAsyncThunk(
  "notificationsStore/activateToast",
  async (dataForToast: any) => {
    return dataForToast;
  }
);

export const activateSpinner = createAsyncThunk(
  "notificationStore/activateSpinner",
  async (spinnerState: any) => {
    return spinnerState;
  }
);
