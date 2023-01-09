import {createAsyncThunk} from '@reduxjs/toolkit'

const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL

export const setMainPanelData = createAsyncThunk(
  'mainPanelStore/setMainPanelData',
  async (mainPanelData: any) => {
    return mainPanelData
  }
)

export const setMainPanelBodyDataType = createAsyncThunk(
  'mainPanelStore/setMainPanelBodyDataType',
  async (mainPanelBodyDataType: any) => {
    return mainPanelBodyDataType
  }
)
