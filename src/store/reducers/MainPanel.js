import { createSlice } from '@reduxjs/toolkit'
import { setMainPanelBodyDataType, setMainPanelData } from '../actions/MainPanel'

export const mainPanelSlice = createSlice({
  name: 'mainPanelStore',
  initialState: {
    mainPanelData: null,
    mainPanelBodyDataType: { type: 'START' },
  },
  reducers: {},
  extraReducers: {
    [setMainPanelData.fulfilled]: (state, action) => {
      state.mainPanelData = action.payload
    },

    [setMainPanelBodyDataType.fulfilled]: (state, action) => {
      state.mainPanelBodyDataType = action.payload
    },
  },
})

export const mainPanelReducer = mainPanelSlice.reducer
