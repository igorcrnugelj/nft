import { createSlice } from "@reduxjs/toolkit";
import {
  getLayers,
  updateLayers,
  getLayerImages,
} from "../actions/Layer";
import { deleteLayer } from "../actions/Layer";
import { calculateRarityImages } from "../actions/Layer";
import { updateFixRarityImages } from "../actions/Layer";
import {
  createLayer,
  setLayersInitialState,
  editLayer,
  setImageData,
  addNewImage,
  setMaxRarityForCurrentImage,
} from "../actions/Layer";

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
    [getLayers.pending]: (state) => {
      state.loading = true;
    },
    [getLayers.fulfilled]: (state, action) => {
      state.loading = false;
      state.layers = action.payload;
    },
    [getLayers.rejected]: (state) => {
      state.loading = false;
    },
    //DELETE Layer
    [deleteLayer.pending]: (state) => {
      state.loading = true;
    },
    [deleteLayer.fulfilled]: (state) => {
      state.loading = false;
    },
    [deleteLayer.rejected]: (state) => {
      state.loading = false;
    },
    //UPDATE Layers
    [updateLayers.pending]: (state) => {
      state.loading = true;
    },
    [updateLayers.fulfilled]: (state, action) => {
      state.loading = false;
      state.layers = action.payload;
    },
    [updateLayers.rejected]: (state) => {
      state.loading = false;
    },
    //UPDATE Layer
    [editLayer.pending]: (state) => {
      state.loading = true;
    },
    [editLayer.fulfilled]: (state) => {
      state.loading = false;
      state.editedLayer = true;
    },
    [editLayer.rejected]: (state) => {
      state.loading = false;
    },

    //CREATE Layer
    [createLayer.pending]: (state) => {
      state.loading = true;
      state.createLayer = false;
    },
    [createLayer.fulfilled]: (state) => {
      state.loading = false;
      state.createLayer = true;
    },
    [createLayer.rejected]: (state) => {
      state.loading = false;
    },
    //GET Layer Images
    [getLayerImages.pending]: (state) => {
      state.loading = true;
    },
    [getLayerImages.fulfilled]: (state, action) => {
      state.loading = false;
      state.images = action.payload.layerImages;
      state.dataAboutLayer = action.payload.dataAboutLayer;
    },
    [getLayerImages.rejected]: (state) => {
      state.loading = false;
    },
    //CalculateRarityImages
    [calculateRarityImages.pending]: (state) => {
      state.loading = true;
    },
    [calculateRarityImages.fulfilled]: (state, action) => {
      state.loading = false;
      state.images = action.payload;
    },
    [calculateRarityImages.rejected]: (state) => {
      state.loading = false;
    },
    //UpdateFixRarityImages
    [updateFixRarityImages.pending]: (state) => {
      state.loading = true;
    },
    [updateFixRarityImages.fulfilled]: (state, action) => {
      state.loading = false;
      // state.images = action.payload.data
      // state.maxRarityForCurrentImage = action.payload.maxRarity
    },
    [updateFixRarityImages.rejected]: (state) => {
      state.loading = false;
    },
    [setLayersInitialState.fulfilled]: (state, action) => {
      state.layers = action.payload;
    },

    //SET IMAGE
    [setImageData.pending]: (state) => {
      state.loading = true;
    },
    [setImageData.fulfilled]: (state, action) => {
      state.loading = false;
      state.image = action.payload;
    },
    [setImageData.rejected]: (state) => {
      state.loading = false;
    },
    //ADD NEW IMAGE
    [addNewImage.pending]: (state) => {
      state.loading = true;
      state.spinnerData = true;
    },
    [addNewImage.fulfilled]: (state) => {
      state.loading = false;
      state.spinnerData = false;
    },
    [addNewImage.rejected]: (state) => {
      state.loading = false;
    },

    //SET IMAGE
    [setMaxRarityForCurrentImage.pending]: (state) => {
      state.loading = true;
    },
    [setMaxRarityForCurrentImage.fulfilled]: (
      state,
      action
    ) => {
      state.loading = false;
      state.maxRarityForCurrentImage = action.payload;
    },
    [setMaxRarityForCurrentImage.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const layerReducer = layerSlice.reducer;
