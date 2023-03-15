import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import {
  calculateRarityImages,
  deleteImage,
  getLayerImages,
  setImageData,
  setMaxRarityForCurrentImage,
  updateFixRarityImages,
} from "../../store/actions/Layer-actions";
import {
  setMainPanelBodyDataType,
  setMainPanelData,
} from "../../store/actions/MainPanelActions";
import MainPanelDataType from "../../enums/MainPanelDataType";
import EditImageForm from "./EditImageForm";

const LayerImage = (image: any) => {
  const dispatch: any = useDispatch();
  const [newRarityValue, setNewRarityValue] = useState(image.image.imageRarity);
  const [fixRarity, setFixRarity] = useState(false);
  const [showEditImageForm, setShowEditImageForm] = useState(false);
  const mainPanelData = useSelector(
    (state: any) => state.mainPanelStore.mainPanelData
  );
  const maxRarityForCurrentImage = useSelector(
    (state: any) => state.layers.maxRarityForCurrentImage
  );

  useEffect(() => {
    setNewRarityValue(image.image.imageRarity);
  }, [image.image.imageRarity]);

  useEffect(() => {
    if (image.image.fixedRarity === true) {
      setFixRarity(true);
    }
  }, [image.image.fixedRarity]);

  const rangeHandler = async () => {
    const imagesForCalculateRarityFunction = image.images;
    const imageForCalculateRarityFunction = image.image;
    const calculateRarityImagesResponse = await dispatch(
      calculateRarityImages({
        newRarityValue,
        imagesForCalculateRarityFunction,
        imageForCalculateRarityFunction,
        fixRarity,
        maxRarityForCurrentImage,
      })
    ).unwrap();
    if (calculateRarityImagesResponse.success) {
      dispatch(
        setMaxRarityForCurrentImage(calculateRarityImagesResponse.maxRarity)
      );
      dispatch(
        setMainPanelData({
          collectionData: mainPanelData.collectionData,
          layerData: {
            images: calculateRarityImagesResponse.data,
            data: mainPanelData.layerData.data,
          },
          type: MainPanelDataType.LayerImages,
        })
      );
    }
  };

  const rarityValueChange = (event: any) => {
    const rarityValue: any = event.target.value;
    setNewRarityValue(rarityValue);
  };

  const checkHandler = async (event: any) => {
    const imagesForCalculateRarityFunction = image.images;
    const imageForCalculateRarityFunction = image.image;
    const fixRarity = event.target.checked;
    setFixRarity(event.target.checked);
    const updateFixRarityImagesResponse = await dispatch(
      updateFixRarityImages({
        imagesForCalculateRarityFunction,
        imageForCalculateRarityFunction,
        fixRarity,
      })
    ).unwrap();
    if (updateFixRarityImagesResponse.success) {
      dispatch(
        setMaxRarityForCurrentImage(updateFixRarityImagesResponse.maxRarity)
      );
      dispatch(
        setMainPanelData({
          collectionData: mainPanelData.collectionData,
          layerData: {
            images: updateFixRarityImagesResponse.data,
            data: mainPanelData.layerData.data,
          },
          type: MainPanelDataType.LayerImages,
        })
      );
    }
  };

  const deleteImageHandler = async () => {
    const deleteImageResponse = await dispatch(
      deleteImage(image.image.id)
    ).unwrap();
    if (deleteImageResponse.success) {
      const getLayerImagesResponse = await dispatch(
        getLayerImages(mainPanelData.layerData.data.id)
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

  const editImageHandler = () => {
    setShowEditImageForm(true);
    dispatch(setImageData(image));
    dispatch(
      setMainPanelBodyDataType({
        type: MainPanelDataType.EditImage,
      })
    );
  };

  const closeEditImageFormHandler = (result: any) => {
    setShowEditImageForm(result);
  };

  return (
    <Fragment>
      <div className="layer-image-main-container">
        {!showEditImageForm ? (
          <div className="image-name-pencil-and-trash-container-container">
            <div className="layer-image-name">{image.image.originalName}</div>
            <div className="layer-image-pencil-and-trash-container-div">
              <i
                onClick={editImageHandler}
                className="bi bi-pencil-fill layer-image-bi-pencil"
              ></i>
              <i
                onClick={deleteImageHandler}
                className="bi bi-trash-fill layer-image-bi-trash"
              ></i>
            </div>
          </div>
        ) : (
          <EditImageForm closeForm={closeEditImageFormHandler} />
        )}
        <img className="layer-image" src={image.image.url} />
        <div className="fix-rarity-container">
          <div className="fix-rarity-text">Fix Rarity: </div>
          <Form.Check checked={fixRarity} onChange={checkHandler} />
        </div>
        <div className="range-slider-container">
          <div className="range-slider-text">Image Rarity:</div>
          <input
            type="range"
            className="range-slider-slider"
            max={maxRarityForCurrentImage}
            value={newRarityValue}
            onChange={rarityValueChange}
            onMouseUp={rangeHandler}
            disabled={image.image.fixedRarity}
          ></input>
          {!fixRarity ? (
            <input
              className="range-slider-input-field"
              value={newRarityValue}
              disabled
              readOnly
            />
          ) : (
            <input
              className="range-slider-input-field"
              value={newRarityValue}
              readOnly
            />
          )}
        </div>
        <div className="layer-image-delete-and-edit-buttons-container"></div>
      </div>
    </Fragment>
  );
};

export default LayerImage;
