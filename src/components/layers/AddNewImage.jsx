import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import { addNewImage, getLayerImages } from "../../store/actions/Layer";
import MainPanelDataType from "../../enums/MainPanelDataType";
import { setMainPanelData } from "../../store/actions/MainPanel";

const AddNewImage = () => {
  const mainPanelData = useSelector(
    (state) => state.mainPanelStore.mainPanelData
  );
  const dispatch = useDispatch();

  async function imageSize(imageUrl) {
    let img = new Image();
    img.src = window.URL.createObjectURL(imageUrl);
    const promise = new Promise((resolve, reject) => {
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        resolve({ width, height });
      };
    });
    return promise;
  }
  const fileSelectedHandler = async (event) => {
    const images = mainPanelData.layerData.images;
    const imageUrl = event.target.files[0];
    const imageDimensions = await imageSize(imageUrl);
    let layerOrder = 1;
    let max = 0;
    if (images.length > 0) {
      max = images.reduce((prev, current) =>
        prev.order > current.order ? prev : current
      );
      layerOrder = parseInt(max.order + 1);
    }
    const imageData = {
      collectionId: mainPanelData.layerData.data.collectionId,
      layerId: mainPanelData.layerData.data.layerId,
      contentType: event.target.files[0].type,
      orginalName: event.target.files[0].name,
      order: layerOrder,
      width: imageDimensions.width,
      height: imageDimensions.height,
    };
    const imageFileData = event.target.files[0];
    const imageDataCollection = {
      imageData,
      imageFileData,
    };
    const addNewImageResponse = await dispatch(
      addNewImage(imageDataCollection)
    ).unwrap();
    if (addNewImageResponse.success) {
      const getLayerImagesResponse = await dispatch(
        getLayerImages(mainPanelData.layerData.data.layerId)
      ).unwrap();
      if (getLayerImagesResponse.success) {
        dispatch(
          setMainPanelData({
            collectionData: mainPanelData.collectionData,
            layerData: {
              images: getLayerImagesResponse.data,
              data: mainPanelData.layerData.data,
            },
            type: MainPanelDataType.LayerImages,
          })
        );
      }
    }
  };

  return (
    <Fragment>
      <div className="add-new-image-main-container">
        <div className="add-new-image-text-and-icon-container">
          <i className="bi bi-images"></i>
          <div className="add-new-image-text">Add new image:</div>
        </div>
        <Form.Control
          className="add-new-image-file-button"
          type="file"
          onChange={fileSelectedHandler}
        />
      </div>
    </Fragment>
  );
};

export default AddNewImage;
