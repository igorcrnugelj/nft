import { createAsyncThunk } from "@reduxjs/toolkit";

export const setMainPanelData = createAsyncThunk(
  "mainPanelStore/setMainPanelData",
  async (mainPanelData) => {
    return mainPanelData;
  }
);

export const setMainPanelBodyDataType = createAsyncThunk(
  "mainPanelStore/setMainPanelBodyDataType",
  async (mainPanelBodyDataType) => {
    return mainPanelBodyDataType;
  }
);
