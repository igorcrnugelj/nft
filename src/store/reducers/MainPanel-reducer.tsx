import {createSlice} from '@reduxjs/toolkit'
import {setMainPanelBodyDataType, setMainPanelData} from '../actions/MainPanelActions'

export const mainPanelSlice = createSlice({
  name: 'mainPanelStore',
  initialState: {
    mainPanelData: null,
    mainPanelBodyDataType: {type: 'START'},
  },
  reducers: {},
  extraReducers: {
    [setMainPanelData.fulfilled as any]: (state: any, action: any) => {
      state.mainPanelData = action.payload
    },

    [setMainPanelBodyDataType.fulfilled as any]: (state: any, action: any) => {
      state.mainPanelBodyDataType = action.payload
    },
  },
})

export const mainPanelReducer = mainPanelSlice.reducer
