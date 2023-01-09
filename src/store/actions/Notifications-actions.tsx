import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import MainPanelDataType from '../../enums/MainPanelDataType'
const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL

export const activateToast = createAsyncThunk(
  'notificationsStore/activateToast',
  async (dataForToast: any) => {
    return dataForToast
  }
)

export const activateSpinner = createAsyncThunk(
  'notificationStore/activateSpinner',
  async (spinnerState: any) => {
    return spinnerState
  }
)
