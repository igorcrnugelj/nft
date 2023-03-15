import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import { addNewImage, getLayerImages } from "../../store/actions/Layer-actions";
import MainPanelDataType from "../../enums/MainPanelDataType";
import { setMainPanelData } from "../../store/actions/MainPanelActions";

const AddNewImage = () => {
  const dispatch: any = useDispatch();
  const mainPanelData = useSelector(
    (state: any) => state.mainPanelStore.mainPanelData
  );
  const [activateLoader, setActivateLoader] = useState(false);
  const [iteration, setIteration] = useState(0);
  const [totalIteration, setTotalIteration] = useState(0);

  async function imageSize(imageUrl: any) {
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

  const selectImagesHandler = async (event: any) => {
    setActivateLoader(true);
    let imageOrder = 1;
    let max: any = 0;
    const images = mainPanelData.layerData.images;
    if (images.length > 0) {
      max = images.reduce((prev: any, current: any) =>
        prev.order > current.order ? prev : current
      );
      imageOrder = parseInt(max.order + 1);
    }

    setIteration(1);
    setTotalIteration(event.target.files.length);

    const expectedNumberOfImages =
      mainPanelData.layerData.images.length + event.target.files.length;

    for (let i = 0; i < event.target.files.length; i++) {
      const imageUrl = event.target.files[i];
      const imageFileData = event.target.files[i];
      const imageDimensions: any = await imageSize(imageUrl);
      const imageData = {
        collectionId: mainPanelData.layerData.data.collectionId,
        layerId: mainPanelData.layerData.data.id,
        contentType: event.target.files[i].type,
        originalName: event.target.files[i].name,
        order: imageOrder + i,
        width: imageDimensions.width,
        height: imageDimensions.height,
      };
      const imageDataCollection = {
        imageData,
        imageFileData,
      };
      const addNewImageResponse = await dispatch(
        addNewImage(imageDataCollection)
      ).unwrap();
      if (addNewImageResponse.success) {
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
          setTimeout(() => {
            setIteration(
              getLayerImagesResponse.data.length -
                mainPanelData.layerData.images.length +
                1
            );
          }, 1500);
          setTotalIteration(event.target.files.length);
          if (getLayerImagesResponse.data.length === expectedNumberOfImages) {
            setActivateLoader(false);
          }
        }
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
        {!activateLoader ? (
          <Form.Control
            className="add-new-image-file-button"
            type="file"
            onChange={selectImagesHandler}
            multiple
          />
        ) : (
          <div className="loader-main-container">
            <span className="loader"></span>
            <p>
              Upload: {iteration}/{totalIteration}
            </p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default AddNewImage;
