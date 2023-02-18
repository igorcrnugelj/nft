import { useDispatch, useSelector } from "react-redux";
import {
  generatePreviewImages,
  getCollections,
  getPreviewImages,
} from "../../store/actions/Collection";
import { setMainPanelData } from "../../store/actions/MainPanel";
import { activateSpinner } from "../../store/actions/Notifications";

const GeneratePreviewImages = () => {
  const dispatch = useDispatch();
  const collection = useSelector(
    (state) => state.mainPanelStore.mainPanelData.collectionData
  );
  const mainPanelData = useSelector(
    (state) => state.mainPanelStore.mainPanelData
  );

  const generatePreviewImagesHandler = async () => {
    dispatch(activateSpinner(true));
    const collectionData = {
      userId: collection.collection.userId,
      collectionId: collection.collection.collectionId,
    };

    const getGeneratedCollectionRecursion = async (attempt) => {
      await wait(6000);
      const getPreviewImagesResponse = await dispatch(
        getPreviewImages(collectionData.collectionId)
      ).unwrap();
      const newAttempt = attempt - 1;
      if (getPreviewImagesResponse.data.length === 0) {
        if (newAttempt > 0) {
          getGeneratedCollectionRecursion(newAttempt);
        } else {
          console.log(
            "Time has expired, could not fetch collection,please try again!"
          );
        }
      } else {
        const mainPanelDataEdited = {
          ...mainPanelData,
          collectionData: {
            collection: {
              ...collection.collection,
              previewImages: getPreviewImagesResponse.data,
            },
          },
        };
        dispatch(setMainPanelData(mainPanelDataEdited));
        dispatch(getCollections());
        dispatch(activateSpinner(false));
      }
    };
    const generatePreviewImagesResponse = await dispatch(
      generatePreviewImages(collectionData)
    ).unwrap();
    if (generatePreviewImagesResponse.success) {
      getGeneratedCollectionRecursion(5);
    }
  };

  function wait(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }

  return (
    <button
      type="reset"
      className="preview-button"
      onClick={generatePreviewImagesHandler}
    >
      PREVIEW
    </button>
  );
};

export default GeneratePreviewImages;
