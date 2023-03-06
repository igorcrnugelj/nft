import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { nftClient } from "../../AxiosClient";

export const getCollections = createAsyncThunk(
  "collectionsStore/getCollections",

  async (_, { getState }: any) => {
    const user: any = getState().loginStore.user;
    if (!user) return [];
    const res = await nftClient.get(`/collection/?userId=${user.userId}`);
    console.log("data: ", res.data);
    console.log("status: ", res.status);

    console.log("res.data from getCollections: ", res.data);
    return res.data;
  }
);

export const createCollection = createAsyncThunk(
  "collectionsStore/createCollection",
  async (collection: any) => {
    try {
      const { data } = await nftClient.put(
        `/collection/createCollection`,
        collection
      );
      return {
        data,
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }
);

export const deleteCollection = createAsyncThunk(
  "collectionsStore/deleteCollection",
  async (collectionId: any, { getState }: any) => {
    const user: any = getState().loginStore.user;
    try {
      const { data } = await nftClient.delete(
        `/collection/?userId=${user.userId}&collectionId=${collectionId}`
      );
      return { data, success: true };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }
);

export const editCollection = createAsyncThunk(
  "collectionsStore/editCollection",
  async (collection: any) => {
    try {
      const { data } = await nftClient.post(
        `/collection/updateCollection`,
        collection
      );
      return { data, success: true };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }
);

export const generateCollection = createAsyncThunk(
  "collectionsStore/generateCollection",
  async (collectionData: { userId: any; collectionId: any; txHash: any }) => {
    const { userId, collectionId, txHash } = collectionData;
    try {
      const { data } = await nftClient.post(`/collection/generate`, {
        userId,
        collectionId,
        txHash,
      });
      return { data, success: true };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }
);
export const getGeneratedCollection = createAsyncThunk(
  "collectionsStore/getGeneratedCollection",
  async (collectionId: any) => {
    try {
      const { data } = await nftClient.get(
        `/collection/generated?collectionId=${collectionId}`
      );

      console.log(data);

      return { data, success: true };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }
);
export const setGeneratedCollection = createAsyncThunk(
  "collectionsStore/setGeneratedCollection",
  async (generatedCollection: any) => {
    return generatedCollection;
  }
);

export const generatePreviewImages = createAsyncThunk(
  "collectionsStore/generatePreviewImages",
  async (collectionData: { userId: any; collectionId: any }) => {
    const { userId, collectionId } = collectionData;
    try {
      const { data } = await nftClient.post(
        `/collection/refresh-preview-images`,
        {
          userId,
          collectionId,
        }
      );
      return { data, success: true };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }
);
export const getPreviewImages = createAsyncThunk(
  "collectionsStore/getPreviewImages",
  async (collectionId: any) => {
    try {
      const { data } = await nftClient.get(
        `/collection/preview-images?collectionId=${collectionId}`
      );

      return { data, success: true };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }
);

export const setReceiptData = createAsyncThunk(
  "collectionsStore/setReceiptData",
  async ({ collectionSize, ethInUsd }: any) => {
    const subtotal = 0.16 * collectionSize;
    const subtotalFixed = subtotal.toFixed(2);
    const vat = (subtotal * 25) / 100;
    const vatFixed = vat.toFixed(2);
    const total = subtotal + vat;
    const totalFixed: any = total.toFixed(2);
    const ethValue = (1 / ethInUsd) * totalFixed;
    const receiptData = {
      subtotal: subtotalFixed,
      vat: vatFixed,
      total: totalFixed,
      eth: ethValue,
    };
    return receiptData;
  }
);
export const getEthereumPriceInUsd = createAsyncThunk(
  "collectionsStore/getEthereumPriceInUsd",
  async () => {
    try {
      const { data } = await axios.get(
        `https://api.coincap.io/v2/assets/ethereum`
      );

      return { data, success: true };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }
);
export const setTransactionStatus = createAsyncThunk(
  "collectionsStore/setTransactionStatus",
  async (transactionStatusData: any) => {
    return transactionStatusData;
  }
);
export const setWalletAddress = createAsyncThunk(
  "collectionsStore/setWalletAddress",
  async (walletAddressData: any) => {
    return walletAddressData;
  }
);
export const setStartGeneratingCollectionsProcess = createAsyncThunk(
  "collectionsStore/setStartGeneratingCollectionsProcess",
  async (startGeneratingCollectionsProcess: any) => {
    return startGeneratingCollectionsProcess;
  }
);

export const getApprovalToken = createAsyncThunk(
  "collectionsStore/getApprovalToken",
  async (collectionId: any) => {
    try {
      const { data } = await nftClient.get(
        `collection/generate-token?collectionId=${collectionId}`
      );

      return { data, success: true };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }
);
export const setTransactionHash = createAsyncThunk(
  "collectionsStore/setTransactionHash",
  async (transactionHash: any) => {
    return transactionHash;
  }
);
