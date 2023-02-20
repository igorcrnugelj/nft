import React, { useEffect, Fragment, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import { getLayers } from "../../store/actions/Layer-actions";
import MainPanelDataType from "../../enums/MainPanelDataType";
import AccordionContext from "react-bootstrap/AccordionContext";
import {
  setMainPanelBodyDataType,
  setMainPanelData,
} from "../../store/actions/MainPanelActions";

const AccordionHeader = (collection: any) => {
  const dispatch: any = useDispatch();
  const { activeEventKey } = useContext(AccordionContext);
  const mainPanelData = useSelector(
    (state: any) => state.mainPanelStore.mainPanelData
  );

  // useEffect(() => {
  //   if (mainPanelData) {
  //     if (
  //       collection.collection.collectionId ===
  //       mainPanelData.collectionData.collection.collectionId
  //     ) {
  //       dispatch(
  //         setMainPanelData({
  //           collectionData: collection,
  //           layerData: null,
  //           type: MainPanelDataType.CollectionPreview,
  //         })
  //       );
  //     }
  //   }
  // }, [collection]);

  const sendCollectionDataHandler = () => {
    console.log("CLICK");
    dispatch(getLayers(collection.collection.collectionId));
    if (activeEventKey === collection.collection.collectionId) {
      dispatch(setMainPanelData(null));
    } else {
      dispatch(
        setMainPanelData({
          collectionData: collection,
          layerData: null,
          type: MainPanelDataType.CollectionPreview,
        })
      );
      dispatch(
        setMainPanelBodyDataType({
          type: MainPanelDataType.CloseDownloadButton,
        })
      );
    }
  };

  return (
    <Fragment>
      <Accordion.Header onClick={sendCollectionDataHandler}>
        <div className="accordion-header"> {collection.collection.name}</div>
      </Accordion.Header>
    </Fragment>
  );
};
export default AccordionHeader;
