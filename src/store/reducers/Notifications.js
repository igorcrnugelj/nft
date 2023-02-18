import { createSlice } from "@reduxjs/toolkit";
import {
  activateToast,
  activateSpinner,
} from "../actions/Notifications";

export const notificationsSlice = createSlice({
  name: "notificationsStore",
  initialState: {
    toastData: null,
    spinnerData: null,
    spinnerDataFromNotificationStore: null,
  },
  reducers: {},
  extraReducers: {
    [activateToast.fulfilled]: (state, action) => {
      state.toastData = {
        time: new Date().getTime(),
        data: action.payload,
      };
    },
    [activateSpinner.fulfilled]: (state, action) => {
      state.spinnerDataFromNotificationStore = action.payload;
    },
  },
});

export const notificationsReducer = notificationsSlice.reducer;
