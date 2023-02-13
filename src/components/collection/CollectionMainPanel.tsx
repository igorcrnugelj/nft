import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import MainPanelDataType from "../../enums/MainPanelDataType";
import LayerPreview from "../layers/LayerPreview";
import CollectionPreview from "./CollectionPreview";

const CollectionMainPanel = () => {
  const mainPanelData = useSelector(
    (state: any) => state.mainPanelStore.mainPanelData
  );

  if (!mainPanelData) {
    return <></>;
  }

  return (
    <Fragment>
      {mainPanelData.type === MainPanelDataType.CollectionPreview && (
        <CollectionPreview collection={mainPanelData.collectionData} />
      )}

      {mainPanelData.type === MainPanelDataType.LayerImages && (
        <LayerPreview layerData={mainPanelData.layerData} />
      )}
    </Fragment>
  );
};

export default CollectionMainPanel;
