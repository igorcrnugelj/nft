import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import MainPanelDataType from "../../enums/MainPanelDataType";
import EditCollectionForm from "../collection/EditCollectionForm";
import AddNewImage from "./AddNewImage";
import CreateNewLayer from "./CreateNewLayer";
import EditImageForm from "./EditImageForm";
import EditLayerForm from "./EditLayerForm";
import LayerData from "./LayerData";
import LayerImages from "./LayerImages";

const LayerPreview = (layerData: any) => {
  const mainPanelBodyDataType = useSelector(
    (state: any) => state.mainPanelStore.mainPanelBodyDataType
  );

  return (
    <Fragment>
      <EditCollectionForm />
      {mainPanelBodyDataType.type === MainPanelDataType.ShowLayerEditForm && (
        <EditLayerForm />
      )}
      {mainPanelBodyDataType.type !== MainPanelDataType.DeleteLayer &&
        mainPanelBodyDataType.type !== MainPanelDataType.ShowLayerEditForm && (
          <LayerData layerData={layerData} />
        )}
      <AddNewImage />
      {mainPanelBodyDataType.type === MainPanelDataType.EditImage && (
        <EditImageForm />
      )}
      <LayerImages images={layerData.layerData.images} />
    </Fragment>
  );
};

export default LayerPreview;
