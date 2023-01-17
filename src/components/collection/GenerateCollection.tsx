import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainPanelDataType from "../../enums/MainPanelDataType";
import {
  generateCollection,
  getGeneratedCollection,
  setGeneratedCollection,
} from "../../store/actions/Collection-actions";
import { setMainPanelBodyDataType } from "../../store/actions/MainPanelActions";
import { activateSpinner } from "../../store/actions/Notifications-actions";
import Spinner from "react-bootstrap/Spinner";

const GenerateCollection = () => {
  const dispatch: any = useDispatch();
  const collection = useSelector(
    (state: any) => state.mainPanelStore.mainPanelData.collectionData
  );
  const [showSpinner, setShowSpinner] = useState(false);

  const generateCollectionHandler = async () => {
    dispatch(activateSpinner(true));
    setShowSpinner(true);

    const collectionData = {
      userId: collection.collection.userId,
      collectionId: collection.collection.collectionId,
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
        setShowSpinner(false);
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
    <Fragment>
      {!showSpinner ? (
        <button
          type="reset"
          className="generate-collection-button"
          onClick={generateCollectionHandler}
        >
          GENERATE COLLECTION
        </button>
      ) : (
        <button
          type="reset"
          className="generate-collection-button-and-spinner"
          onClick={generateCollectionHandler}
        >
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />{" "}
          GENERATION IN PROGRESS...
        </button>
      )}
    </Fragment>
  );
};

export default GenerateCollection;
