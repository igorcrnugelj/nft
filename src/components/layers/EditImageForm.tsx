import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMainPanelData } from "../../store/actions/MainPanelActions";
import MainPanelDataType from "../../enums/MainPanelDataType";
import { editImage, getLayerImages } from "../../store/actions/Layer-actions";

const EditImageForm = ({ closeForm }: any) => {
  const dispatch: any = useDispatch();
  const image = useSelector((state: any) => state.layers.image);
  const mainPanelData = useSelector(
    (state: any) => state.mainPanelStore.mainPanelData
  );

  const [imageName, setImageName] = useState("");

  useEffect(() => {
    if (image) {
      setImageName(image.image.orginalName);
    }
  }, [image]);

  const imageNameChangeHandler = (event: any) => {
    setImageName(event.target.value);
  };

  const saveImageChangesHandler = async () => {
    console.log("image: ", image);
    const imageEdited = {
      layerId: image.image.layerId,
      imageId: image.image.imageId,
      orginalName: imageName,
      s3Name: image.image.s3Name,
      url: image.image.url,
      order: image.image.order,
      contentType: image.image.contentType,
      imageRarity: image.image.imageRarity,
      fixedRarity: image.image.fixedRarity,
    };
    const editImageResponse = await dispatch(editImage(imageEdited)).unwrap();
    if (editImageResponse.success) {
      closeForm(false);
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

  const cancelEditImageFormHandler = () => {
    closeForm(false);
  };

  return (
    <Fragment>
      <div className="edit-image-name-and-check-and-cancel-icons-container">
        <div className="image-name-input-field">
          <input
            className="edit-image-input-field"
            type="text"
            value={imageName}
            onChange={imageNameChangeHandler}
          />
        </div>
        <div className="image-check-and-cancel-icons-div">
          <i className="bi bi-check2" onClick={saveImageChangesHandler}></i>
          <i className="bi bi-x-lg" onClick={cancelEditImageFormHandler}></i>
        </div>
      </div>
    </Fragment>
  );
};

export default EditImageForm;
