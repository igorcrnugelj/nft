import { createSlice } from "@reduxjs/toolkit";
import {
  activateToast,
  activateSpinner,
} from "../actions/Notifications-actions";

export const notificationsSlice = createSlice({
  name: "notificationsStore",
  initialState: {
    toastData: null,
    spinnerData: null,
    spinnerDataFromNotificationStore: null,
  },
  reducers: {},
  extraReducers: {
    [activateToast.fulfilled as any]: (state: any, action: any) => {
      state.toastData = {
        time: new Date().getTime(),
        data: action.payload,
      };
    },
    [activateSpinner.fulfilled as any]: (state: any, action: any) => {
      state.spinnerDataFromNotificationStore = action.payload;
    },
  },
});

export const notificationsReducer = notificationsSlice.reducer;
