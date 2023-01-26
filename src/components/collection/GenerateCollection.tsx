import React, { Fragment, useEffect, useState } from "react";
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
import { useSSE, SSEProvider } from "react-hooks-sse";
import { setImageData } from "../../store/actions/Layer-actions";

const GenerateCollection = () => {
  const dispatch: any = useDispatch();
  const collection = useSelector(
    (state: any) => state.mainPanelStore.mainPanelData.collectionData
  );
  const [showSpinner, setShowSpinner] = useState(false);
  const [data, setData] = useState("Initializing...");

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

      const evtSource = new EventSource("http://63.35.234.60:3000/sse");
      evtSource.onopen = function () {
        console.log("Connection to server opened.");
        console.log(evtSource.readyState);
      };

      evtSource.addEventListener("iteration", (e) => {
        console.log("iteration: ", e);
      });

      evtSource.onmessage = function (e) {
        console.log("e.data: ", e.data);
      };
      evtSource.onerror = function (e) {
        console.log("error: ", e);
      };

      const getGeneratedCollectionResponse = await dispatch(
        getGeneratedCollection(collectionData.collectionId)
      ).unwrap();

      //tu završava novi kod ************************************************************************************************
      // const getGeneratedCollectionResponse = await dispatch(
      //   getGeneratedCollection(collectionData.collectionId)
      // ).unwrap();

      // if (!getGeneratedCollectionResponse.success) {
      //   console.log(
      //     "Time has expired, could not fetch collection,please try again!"
      //   );
      // } else {
      //   dispatch(setGeneratedCollection(getGeneratedCollectionResponse.data));
      // }
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
      {/* <SSEProvider endpoint="http://63.35.234.60:3000/sse"> */}
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
      {/* </SSEProvider> */}
    </Fragment>
  );
};

export default GenerateCollection;
