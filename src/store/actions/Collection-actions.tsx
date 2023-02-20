import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { nftClient } from "../../AxiosClient";

export const getCollections = createAsyncThunk(
  "collectionsStore/getCollections",

  async (_, { getState }: any) => {
    const user: any = getState().loginStore.user;
    if (!user) return [];
    const { data, status } = await nftClient.get(
      `/collection/?userId=${user.userId}`
    );
    console.log("data: ", data);
    console.log("status: ", status);
    return data;
  }
);

// export const getCollections = createAsyncThunk(
//   "collectionsStore/getCollections",
//   async () => {
//     const res = await axios({
//       url: `https://5utv6u04h0.execute-api.us-east-1.amazonaws.com/dev/collection/?userId=01G7EXFE9V27DJCCJQT7Y0101S`,
//       method: "GET",
//     });

//     return res.data;
//   }
// );

export const createCollection = createAsyncThunk(
  "collectionsStore/createCollection",
  async (collection: any) => {
    try {
      const res = await nftClient.put(
        `/collection/createCollection`,
        collection
      );

      if (res.status >= 200 || res.status < 300) {
        return {
          success: true,
          data: res.data,
        };
      } else {
        return {
          success: false,
          data: res.statusText,
        };
      }
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
      const res = await nftClient.delete(
        `/collection/?userId=${user.userId}&collectionId=${collectionId}`
      );
      if (res.status >= 200 || res.status < 300) {
        return {
          success: true,
          data: res.data,
        };
      } else {
        return {
          success: false,
          data: res.statusText,
        };
      }
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
      const res = await nftClient.post(
        `/collection/updateCollection`,
        collection
      );
      if (res.status >= 200 || res.status < 300) {
        return {
          success: true,
          data: res.data,
        };
      } else {
        return {
          success: false,
          data: res.statusText,
        };
      }
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
  async (collectionData: { userId: any; collectionId: any }) => {
    const { userId, collectionId } = collectionData;
    try {
      const res = await nftClient.post(`/collection/generate`, {
        userId,
        collectionId,
      });
      if (res.status >= 200 || res.status < 300) {
        return {
          success: true,
          data: res.data,
        };
      } else {
        return {
          success: false,
          data: res.statusText,
        };
      }
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
      const res = await nftClient.get(
        `/collection/generated?collectionId=${collectionId}`
      );

      console.log(res.data);

      if (res.status >= 200 || res.status < 300) {
        return {
          success: true,
          data: res.data,
        };
      } else {
        return {
          success: false,
          data: res.statusText,
        };
      }
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
      const res = await nftClient.post(`/collection/refresh-preview-images`, {
        userId,
        collectionId,
      });
      if (res.status >= 200 || res.status < 300) {
        return {
          success: true,
          data: res.data,
        };
      } else {
        return {
          success: false,
          data: res.statusText,
        };
      }
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
      const res = await nftClient.get(
        `/collection/preview-images?collectionId=${collectionId}`
      );

      if (res.status >= 200 || res.status < 300) {
        return {
          success: true,
          data: res.data,
        };
      } else {
        return {
          success: false,
          data: res.statusText,
        };
      }
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
  async (receiptData: any) => {
    return receiptData;
  }
);
export const getEthereumPriceInUsd = createAsyncThunk(
  "collectionsStore/getEthereumPriceInUsd",
  async () => {
    try {
      const res = await axios.get(`https://api.coincap.io/v2/assets/ethereum`);

      if (res.status >= 200 || res.status < 300) {
        return {
          success: true,
          data: res.data.data,
        };
      } else {
        return {
          success: false,
          data: res.statusText,
        };
      }
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
