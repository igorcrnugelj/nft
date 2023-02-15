import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { nftClient } from "../../AxiosClient";
import store from "../store";

export const getCollections = createAsyncThunk(
  "collectionsStore/getCollections",
  async () => {
    if (store) {
      store.getState();
    }
    const user: any = store.getState().loginStore.user; //tu sam
    // const user = store.getState.loginStore
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
      const res = await axios({
        url: `https://5utv6u04h0.execute-api.us-east-1.amazonaws.com/dev/collection/createCollection`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        data: collection,
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

export const deleteCollection = createAsyncThunk(
  "collectionsStore/deleteCollection",
  async (collectionData: { userId: any; collectionId: any }) => {
    const { userId, collectionId } = collectionData;
    try {
      const res = await axios({
        url: `https://5utv6u04h0.execute-api.us-east-1.amazonaws.com/dev/collection/?userId=${userId}&collectionId=${collectionId}`,
        method: "DELETE",
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

export const editCollection = createAsyncThunk(
  "collectionsStore/editCollection",
  async (collection: any) => {
    try {
      const res = await axios({
        url: "https://5utv6u04h0.execute-api.us-east-1.amazonaws.com/dev/collection/updateCollection",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: collection,
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

export const generateCollection = createAsyncThunk(
  "collectionsStore/generateCollection",
  async (collectionData: { userId: any; collectionId: any }) => {
    const { userId, collectionId } = collectionData;
    try {
      const res = await axios({
        url: `https://5utv6u04h0.execute-api.us-east-1.amazonaws.com/dev/collection/generate`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: {
          userId,
          collectionId,
        },
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
      const res = await axios.get(
        `https://5utv6u04h0.execute-api.us-east-1.amazonaws.com/dev/collection/generated?collectionId=${collectionId}`
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
      const res = await axios({
        url: `https://5utv6u04h0.execute-api.us-east-1.amazonaws.com/dev/collection/refresh-preview-images`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: {
          userId,
          collectionId,
        },
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
      const res = await axios.get(
        `https://5utv6u04h0.execute-api.us-east-1.amazonaws.com/dev/collection/preview-images?collectionId=${collectionId}`
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
