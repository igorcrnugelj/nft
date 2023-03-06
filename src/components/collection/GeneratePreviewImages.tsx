import { useDispatch, useSelector } from "react-redux";
import {
  generatePreviewImages,
  getCollections,
  getPreviewImages,
} from "../../store/actions/Collection-actions";
import { setMainPanelData } from "../../store/actions/MainPanelActions";
import { activateSpinner } from "../../store/actions/Notifications-actions";

const GeneratePreviewImages = () => {
  const dispatch: any = useDispatch();
  const collection = useSelector(
    (state: any) => state.mainPanelStore.mainPanelData.collectionData
  );
  const mainPanelData = useSelector(
    (state: any) => state.mainPanelStore.mainPanelData
  );
  const user = useSelector((state: any) => state.loginStore.user);

  const generatePreviewImagesHandler = async () => {
    dispatch(activateSpinner(true));
    const collectionData = {
      userId: user.userId,
      collectionId: collection.collection.collectionId,
    };

    const getGeneratedCollectionRecursion = async (attempt: any) => {
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

  function wait(timeout: any) {
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
      GENERATE PREVIEW
    </button>
  );
};

export default GeneratePreviewImages;
