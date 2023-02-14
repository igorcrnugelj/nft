import { createAsyncThunk } from "@reduxjs/toolkit";

export const setMainPanelData = createAsyncThunk(
  "mainPanelStore/setMainPanelData",
  async (mainPanelData: any) => {
    return mainPanelData;
  }
);

export const setMainPanelBodyDataType = createAsyncThunk(
  "mainPanelStore/setMainPanelBodyDataType",
  async (mainPanelBodyDataType: any) => {
    return mainPanelBodyDataType;
  }
);
