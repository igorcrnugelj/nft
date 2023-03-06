import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainPanelDataType from "../../enums/MainPanelDataType";
import {
  generateCollection,
  getCollections,
  getEthereumPriceInUsd,
  getGeneratedCollection,
  setGeneratedCollection,
  setTransactionStatus,
  setReceiptData,
  setStartGeneratingCollectionsProcess,
} from "../../store/actions/Collection-actions";
import { setMainPanelBodyDataType } from "../../store/actions/MainPanelActions";
import ProgressBar from "react-bootstrap/ProgressBar";

const GenerateCollection = () => {
  const dispatch: any = useDispatch();
  const collection = useSelector(
    (state: any) => state.mainPanelStore.mainPanelData.collectionData
  );
  const startGeneratingCollections = useSelector(
    (state: any) => state.collectionsStore.startGeneratingCollectionsProcess
  );
  const collections = useSelector(
    (state: any) => state.collectionsStore.collections
  );
  const user = useSelector((state: any) => state.loginStore.user);
  const transactionHash = useSelector(
    (state: any) => state.collectionsStore.transactionHash
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (collections) {
      collections.map((currentCollection: any) => {
        if (
          currentCollection.collectionId === collection.collection.collectionId
        ) {
          if (currentCollection.generating === true) {
            setIsGenerating(true);
          } else {
            setIsGenerating(false);
            dispatch(setStartGeneratingCollectionsProcess(false));
          }
        }
      });
    }
  }, [collections]);

  useEffect(() => {
    if (startGeneratingCollections) {
      generateCollectionHandler();
    }
  }, [startGeneratingCollections]);

  useEffect(() => {
    if (collection.collection.generating) {
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
          let progressPercentage = (
            (objIterationValue / objTotalValue) *
            100
          ).toFixed(0);
          setPercentage(parseInt(progressPercentage));
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
            getGeneratedCollectionFunction(collection.collection.collectionId);
          }
        } else {
          setPercentage(2);
        }
      };
      evtSource.onerror = function (e) {
        console.log("error: ", e);
      };
    }
  }, []);

  const sendPaymentData = async () => {
    const getEthereumPriceInUsdResponse = await dispatch(
      getEthereumPriceInUsd()
    ).unwrap();

    dispatch(
      setReceiptData({
        collectionSize: collection.collection.collectionSize,
        ethInUsd: getEthereumPriceInUsdResponse.data.data.priceUsd,
      })
    );
    dispatch(
      setMainPanelBodyDataType({
        type: MainPanelDataType.ShowPaymentNotification,
      })
    );
  };

  const generateCollectionHandler = async () => {
    dispatch(setTransactionStatus(null));
    const collectionData = {
      userId: user.userId,
      collectionId: collection.collection.collectionId,
      txHash: transactionHash,
    };
    const generateCollectionResponse = await dispatch(
      generateCollection(collectionData)
    ).unwrap();
    if (generateCollectionResponse.success) {
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
          let progressPercentage = (
            (objIterationValue / objTotalValue) *
            100
          ).toFixed(0);
          setPercentage(parseInt(progressPercentage));
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
              setPercentage(100);
              setTimeout(() => {
                dispatch(
                  setMainPanelBodyDataType({
                    type: MainPanelDataType.ShowDownloadButton,
                  })
                );
              }, 1500);
            }
            dispatch(getCollections());
          };

          if (obj.completed === true) {
            evtSource.close();
            getGeneratedCollectionFunction(collection.collection.collectionId);
          }
        } else {
          setPercentage(2);
        }
      };

      evtSource.onerror = function (e) {
        console.log("error: ", e);
      };
    }
  };
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
          onClick={sendPaymentData}
        >
          GENERATE COLLECTION
        </button>
      ) : (
        <button
          type="reset"
          className="generate-collection-button"
          onClick={sendPaymentData}
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
