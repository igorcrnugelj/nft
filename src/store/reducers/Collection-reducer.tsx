import {createSlice} from '@reduxjs/toolkit'

import {
  getCollections,
  createCollection,
  deleteCollection,
  editCollection,
  setGeneratedCollection,
} from '../actions/Collection-actions'

export const collectionSlice = createSlice({
  name: 'collectionsStore',
  initialState: {
    collections: [],
    loading: null,
    generatedCollection: null,
    user: {
      userId: '01G7EXFE9V27DJCCJQT7Y0101S',
    },
  },
  reducers: {},
  extraReducers: {
    [getCollections.pending as any]: (state: any) => {
      state.loading = true
    },
    [getCollections.fulfilled as any]: (state: any, action: any) => {
      state.loading = false
      state.collections = action.payload
    },
    [getCollections.rejected as any]: (state: any) => {
      state.loading = false
    },
    // EDIT COLLECTION
    [editCollection.pending as any]: (state: any) => {
      state.loading = true
    },
    [editCollection.fulfilled as any]: (state: any, action: any) => {
      state.loading = false
    },
    [editCollection.rejected as any]: (state: any) => {
      state.loading = false
    },

    [createCollection.pending as any]: (state: any) => {
      state.loading = true
    },
    [createCollection.fulfilled as any]: (state: any, action: any) => {
      state.loading = false
    },
    [createCollection.rejected as any]: (state: any) => {
      state.loading = false
    },

    [deleteCollection.pending as any]: (state: any) => {
      state.loading = true
    },
    [deleteCollection.fulfilled as any]: (state: any, action: any) => {
      state.loading = false
      state.collections = state.collections.filter(
        (collection: any) => collection.collectionId !== action.payload.collectionId
      )
    },
    [deleteCollection.rejected as any]: (state: any) => {
      state.loading = false
    },
    //SET GENERATED COLLECTION
    [setGeneratedCollection.pending as any]: (state: any) => {
      state.loading = true
    },
    [setGeneratedCollection.fulfilled as any]: (state: any, action: any) => {
      state.loading = false
      state.generatedCollection = action.payload
    },
    [setGeneratedCollection.rejected as any]: (state: any) => {
      state.loading = false
    },
  },
})

export const collectionReducer = collectionSlice.reducer
