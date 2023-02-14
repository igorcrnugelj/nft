import { createSlice } from "@reduxjs/toolkit";
import {
  getLayers,
  updateLayers,
  getLayerImages,
} from "../actions/Layer-actions";
import { deleteLayer } from "../actions/Layer-actions";
import { calculateRarityImages } from "../actions/Layer-actions";
import { updateFixRarityImages } from "../actions/Layer-actions";
import {
  createLayer,
  setLayersInitialState,
  editLayer,
  setImageData,
  addNewImage,
  setMaxRarityForCurrentImage,
} from "../actions/Layer-actions";

export const layerSlice = createSlice({
  name: "layers",
  initialState: {
    layers: null,
    collectionIdForEmptyLayersArray: null,
    loading: false,
    editedLayer: false,
    createLayer: false,
    images: null,
    maxRarityForCurrentImage: null,
    image: null,
    spinnerData: null,
  },
  reducers: {
    setCollectionIdForEmptyLayersArray(state, action) {
      state.collectionIdForEmptyLayersArray = action.payload;
    },
    addLayersToArray(state, action) {
      state.layers = action.payload;
    },
    updateImagesToArray(state, action) {
      state.images = action.payload;
    },
  },
  extraReducers: {
    //GET Layers
    [getLayers.pending as any]: (state: any) => {
      state.loading = true;
    },
    [getLayers.fulfilled as any]: (state: any, action: any) => {
      state.loading = false;
      state.layers = action.payload;
    },
    [getLayers.rejected as any]: (state: any) => {
      state.loading = false;
    },
    //DELETE Layer
    [deleteLayer.pending as any]: (state: any) => {
      state.loading = true;
    },
    [deleteLayer.fulfilled as any]: (state: any) => {
      state.loading = false;
    },
    [deleteLayer.rejected as any]: (state: any) => {
      state.loading = false;
    },
    //UPDATE Layers
    [updateLayers.pending as any]: (state: any) => {
      state.loading = true;
    },
    [updateLayers.fulfilled as any]: (state: any, action: any) => {
      state.loading = false;
      state.layers = action.payload;
    },
    [updateLayers.rejected as any]: (state: any) => {
      state.loading = false;
    },
    //UPDATE Layer
    [editLayer.pending as any]: (state: any) => {
      state.loading = true;
    },
    [editLayer.fulfilled as any]: (state: any) => {
      state.loading = false;
      state.editedLayer = true;
    },
    [editLayer.rejected as any]: (state: any) => {
      state.loading = false;
    },

    //CREATE Layer
    [createLayer.pending as any]: (state: any) => {
      state.loading = true;
      state.createLayer = false;
    },
    [createLayer.fulfilled as any]: (state: any) => {
      state.loading = false;
      state.createLayer = true;
    },
    [createLayer.rejected as any]: (state: any) => {
      state.loading = false;
    },
    //GET Layer Images
    [getLayerImages.pending as any]: (state: any) => {
      state.loading = true;
    },
    [getLayerImages.fulfilled as any]: (state: any, action: any) => {
      state.loading = false;
      state.images = action.payload.layerImages;
      state.dataAboutLayer = action.payload.dataAboutLayer;
    },
    [getLayerImages.rejected as any]: (state: any) => {
      state.loading = false;
    },
    //CalculateRarityImages
    [calculateRarityImages.pending as any]: (state: any) => {
      state.loading = true;
    },
    [calculateRarityImages.fulfilled as any]: (state: any, action: any) => {
      state.loading = false;
      state.images = action.payload;
    },
    [calculateRarityImages.rejected as any]: (state: any) => {
      state.loading = false;
    },
    //UpdateFixRarityImages
    [updateFixRarityImages.pending as any]: (state: any) => {
      state.loading = true;
    },
    [updateFixRarityImages.fulfilled as any]: (state: any, action: any) => {
      state.loading = false;
      // state.images = action.payload.data
      // state.maxRarityForCurrentImage = action.payload.maxRarity
    },
    [updateFixRarityImages.rejected as any]: (state: any) => {
      state.loading = false;
    },
    [setLayersInitialState.fulfilled as any]: (state: any, action: any) => {
      state.layers = action.payload;
    },

    //SET IMAGE
    [setImageData.pending as any]: (state: any) => {
      state.loading = true;
    },
    [setImageData.fulfilled as any]: (state: any, action: any) => {
      state.loading = false;
      state.image = action.payload;
    },
    [setImageData.rejected as any]: (state: any) => {
      state.loading = false;
    },
    //ADD NEW IMAGE
    [addNewImage.pending as any]: (state: any) => {
      state.loading = true;
      state.spinnerData = true;
    },
    [addNewImage.fulfilled as any]: (state: any) => {
      state.loading = false;
      state.spinnerData = false;
    },
    [addNewImage.rejected as any]: (state: any) => {
      state.loading = false;
    },

    //SET IMAGE
    [setMaxRarityForCurrentImage.pending as any]: (state: any) => {
      state.loading = true;
    },
    [setMaxRarityForCurrentImage.fulfilled as any]: (
      state: any,
      action: any
    ) => {
      state.loading = false;
      state.maxRarityForCurrentImage = action.payload;
    },
    [setMaxRarityForCurrentImage.rejected as any]: (state: any) => {
      state.loading = false;
    },
  },
});

export const layerReducer = layerSlice.reducer;
