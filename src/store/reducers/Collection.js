import { createSlice } from "@reduxjs/toolkit";
import {
  getCollections,
  createCollection,
  deleteCollection,
  editCollection,
  setGeneratedCollection,
  setReceiptData,
  setTransactionStatus,
} from "../actions/Collection";

export const collectionSlice = createSlice({
  name: "collectionsStore",
  initialState: {
    collections: [],
    loading: null,
    generatedCollection: null,
    user: {
      userId: "01G7EXFE9V27DJCCJQT7Y0101S",
    },
    receiptData: {},
    transactionStatus: null,
  },
  reducers: {},
  extraReducers: {
    [getCollections.fulfilled]: (state, action) => {
      state.loading = false;
      state.collections = action.payload;
    },
    [getCollections.rejected]: (state) => {
      state.loading = false;
    },
    // EDIT COLLECTION
    [editCollection.pending]: (state) => {
      state.loading = true;
    },
    [editCollection.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [editCollection.rejected]: (state) => {
      state.loading = false;
    },
    [createCollection.pending]: (state) => {
      state.loading = true;
    },
    [createCollection.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [createCollection.rejected]: (state) => {
      state.loading = false;
    },
    [deleteCollection.pending]: (state) => {
      state.loading = true;
    },
    [deleteCollection.fulfilled]: (state, action) => {
      state.loading = false;
      state.collections = state.collections.filter(
        (collection) =>
          collection.collectionId !== action.payload.collectionId
      );
    },
    [deleteCollection.rejected]: (state) => {
      state.loading = false;
    },
    //SET GENERATED COLLECTION
    [setGeneratedCollection.pending]: (state) => {
      state.loading = true;
    },
    [setGeneratedCollection.fulfilled]: (state, action) => {
      state.loading = false;
      state.generatedCollection = action.payload;
    },
    [setGeneratedCollection.rejected]: (state) => {
      state.loading = false;
    },
    //SET RECEIPT DATA
    [setReceiptData.fulfilled]: (state, action) => {
      state.receiptData = action.payload;
    },
    //SET PAYMENT STATUS
    [setTransactionStatus.fulfilled]: (state, action) => {
      state.transactionStatus = action.payload;
    },
  },
});

export const collectionReducer = collectionSlice.reducer;
