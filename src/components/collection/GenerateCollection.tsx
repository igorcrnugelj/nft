import React from "react";
import { useDispatch } from "react-redux";
import MainPanelDataType from "../../enums/MainPanelDataType";
import {
  generateCollection,
  getGeneratedCollection,
  setGeneratedCollection,
} from "../../store/actions/Collection-actions";
import { setMainPanelBodyDataType } from "../../store/actions/MainPanelActions";
import { activateSpinner } from "../../store/actions/Notifications-actions";

const GenerateCollection = (collection: any) => {
  const dispatch: any = useDispatch();

  const generateCollectionHandler = async () => {
    dispatch(activateSpinner(true));
    const collectionData = {
      userId: collection.collection.collection.collection.userId,
      collectionId: collection.collection.collection.collection.collectionId,
    };

    const getGeneratedCollectionRecursion = async (attempt: any) => {
      await wait(6000);
      const getGeneratedCollectionResponse = await dispatch(
        getGeneratedCollection(collectionData.collectionId)
      ).unwrap();
      const newAttempt = attempt - 1;
      if (!getGeneratedCollectionResponse.success) {
        if (newAttempt > 0) {
          getGeneratedCollectionRecursion(newAttempt);
        } else {
          console.log(
            "Time has expired, could not fetch collection,please try again!"
          );
        }
      } else {
        dispatch(activateSpinner(false));
        dispatch(setGeneratedCollection(getGeneratedCollectionResponse.data));
        dispatch(
          setMainPanelBodyDataType({
            type: MainPanelDataType.ShowDownloadButton,
          })
        );
      }
    };

    const generateCollectionResponse = await dispatch(
      generateCollection(collectionData)
    ).unwrap();
    if (generateCollectionResponse.success) {
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
      className="generate-collection-button"
      onClick={generateCollectionHandler}
    >
      GENERATE COLLECTION
    </button>
  );
};

export default GenerateCollection;
