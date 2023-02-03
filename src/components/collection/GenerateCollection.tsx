import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainPanelDataType from "../../enums/MainPanelDataType";
import {
  generateCollection,
  getCollections,
  getGeneratedCollection,
  setGeneratedCollection,
} from "../../store/actions/Collection-actions";
import { setMainPanelBodyDataType } from "../../store/actions/MainPanelActions";
import ProgressBar from "react-bootstrap/ProgressBar";

const GenerateCollection = () => {
  const dispatch: any = useDispatch();
  const collection = useSelector(
    (state: any) => state.mainPanelStore.mainPanelData.collectionData
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (collection.collection.generating === true) {
      setIsGenerating(true);
    } else if (collection.collection.generating === false) {
      setIsGenerating(false);
    }
  }, [collection]);

  const generateCollectionHandler = async () => {
    const collectionData = {
      userId: collection.collection.userId,
      collectionId: collection.collection.collectionId,
    };
    const generateCollectionResponse = await dispatch(
      generateCollection(collectionData)
    ).unwrap();
    if (generateCollectionResponse.success) {
      //tu počinje novi kod ********************************************************************************************
      dispatch(getCollections());

      const evtSource = new EventSource(
        `http://63.35.234.60:3000/stream?collectionId=${collection.collection.collectionId}`
      );

      evtSource.onopen = function () {
        console.log("Connection to server opened.");
        console.log(evtSource.readyState);
      };

      evtSource.onmessage = function (e) {
        const obj = JSON.parse(e.data);
        console.log(obj);
        if (obj.iteration !== null) {
          const objIterationValue = obj.iteration;
          const objTotalValue = obj.total;
          let progressPercentage = (objIterationValue / objTotalValue) * 100;
          setPercentage(progressPercentage);
          console.log(objIterationValue, objTotalValue);

          const getGeneratedCollectionFunction = async (id: any) => {
            await wait(4000);
            const getGeneratedCollectionResponse = await dispatch(
              getGeneratedCollection(id)
            ).unwrap();

            if (!getGeneratedCollectionResponse.success) {
              console.log("Could not fetch collection,please try again!");
            } else {
              dispatch(
                setGeneratedCollection(getGeneratedCollectionResponse.data)
              );
              dispatch(
                setMainPanelBodyDataType({
                  type: MainPanelDataType.ShowDownloadButton,
                })
              );
            }
            dispatch(getCollections());
          };

          if (obj.completed === true) {
            evtSource.close();
            setIsGenerating(false);
            getGeneratedCollectionFunction(collection.collection.collectionId);
          }
        } else {
          setPercentage(2);
        }
      };

      evtSource.onerror = function (e) {
        console.log("error: ", e);
      };
      //tu završava novi kod ************************************************************************************************
    }
  };

  // const generateCollectionHandler = async () => {
  //   dispatch(activateSpinner(true));
  //   setShowSpinner(true);

  //   const collectionData = {
  //     userId: collection.collection.userId,
  //     collectionId: collection.collection.collectionId,
  //   };

  //   const getGeneratedCollectionRecursion = async (attempt: any) => {
  //     await wait(6000);
  //     const getGeneratedCollectionResponse = await dispatch(
  //       getGeneratedCollection(collectionData.collectionId)
  //     ).unwrap();
  //     const newAttempt = attempt - 1;
  //     if (!getGeneratedCollectionResponse.success) {
  //       if (newAttempt > 0) {
  //         getGeneratedCollectionRecursion(newAttempt);
  //       } else {
  //         console.log(
  //           "Time has expired, could not fetch collection,please try again!"
  //         );
  //       }
  //     } else {
  //       dispatch(activateSpinner(false));
  //       setShowSpinner(false);
  //       dispatch(setGeneratedCollection(getGeneratedCollectionResponse.data));
  //       dispatch(
  //         setMainPanelBodyDataType({
  //           type: MainPanelDataType.ShowDownloadButton,
  //         })
  //       );
  //     }
  //   };

  //   const generateCollectionResponse = await dispatch(
  //     generateCollection(collectionData)
  //   ).unwrap();
  //   if (generateCollectionResponse.success) {
  //     getGeneratedCollectionRecursion(5);
  //   }
  // };

  function wait(timeout: any) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }

  return (
    <Fragment>
      {!isGenerating ? (
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
          className="generate-collection-button"
          onClick={generateCollectionHandler}
        >
          GENERATE COLLECTION
          <ProgressBar
            className="progress-bar"
            now={percentage}
            animated={true}
            label={`${percentage}%`}
            style={{ backgroundColor: "#b2b2b2" }}
          />
        </button>
      )}
    </Fragment>
  );
};

export default GenerateCollection;
