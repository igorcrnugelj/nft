import { createSlice } from "@reduxjs/toolkit";

import {
  getCollections,
  createCollection,
  deleteCollection,
  editCollection,
  setGeneratedCollection,
  setReceiptData,
  setTransactionStatus,
  setStartGeneratingCollectionsProcess,
  setTransactionHash,
  setWalletAddress,
} from "../actions/Collection-actions";

export const collectionSlice = createSlice({
  name: "collectionsStore",
  initialState: {
    collections: [],
    loading: null,
    generatedCollection: null,
    receiptData: {},
    transactionStatus: null,
    startGeneratingCollectionsProcess: false,
    transactionHash: null,
    walletAddress: null,
  },
  reducers: {},
  extraReducers: {
    [getCollections.fulfilled as any]: (state: any, action: any) => {
      state.loading = false;
      state.collections = action.payload;
    },
    [getCollections.rejected as any]: (state: any) => {
      state.loading = false;
    },
    // EDIT COLLECTION
    [editCollection.pending as any]: (state: any) => {
      state.loading = true;
    },
    [editCollection.fulfilled as any]: (state: any, action: any) => {
      state.loading = false;
    },
    [editCollection.rejected as any]: (state: any) => {
      state.loading = false;
    },

    [createCollection.pending as any]: (state: any) => {
      state.loading = true;
    },
    [createCollection.fulfilled as any]: (state: any, action: any) => {
      state.loading = false;
    },
    [createCollection.rejected as any]: (state: any) => {
      state.loading = false;
    },

    [deleteCollection.pending as any]: (state: any) => {
      state.loading = true;
    },
    [deleteCollection.fulfilled as any]: (state: any, action: any) => {
      state.loading = false;
      state.collections = state.collections.filter(
        (collection: any) =>
          collection.collectionId !== action.payload.collectionId
      );
    },
    [deleteCollection.rejected as any]: (state: any) => {
      state.loading = false;
    },
    //SET GENERATED COLLECTION
    [setGeneratedCollection.pending as any]: (state: any) => {
      state.loading = true;
    },
    [setGeneratedCollection.fulfilled as any]: (state: any, action: any) => {
      state.loading = false;
      state.generatedCollection = action.payload;
    },
    [setGeneratedCollection.rejected as any]: (state: any) => {
      state.loading = false;
    },
    //SET RECEIPT DATA
    [setReceiptData.fulfilled as any]: (state: any, action: any) => {
      state.receiptData = action.payload;
    },
    //SET PAYMENT STATUS
    [setTransactionStatus.fulfilled as any]: (state: any, action: any) => {
      state.transactionStatus = action.payload;
    },
    [setWalletAddress.fulfilled as any]: (state: any, action: any) => {
      state.walletAddress = action.payload;
    },

    [setStartGeneratingCollectionsProcess.fulfilled as any]: (
      state: any,
      action: any
    ) => {
      state.startGeneratingCollectionsProcess = action.payload;
    },

    [setTransactionHash.fulfilled as any]: (state: any, action: any) => {
      state.transactionHash = action.payload;
    },
  },
});

export const collectionReducer = collectionSlice.reducer;
