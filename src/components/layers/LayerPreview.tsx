import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import MainPanelDataType from "../../enums/MainPanelDataType";
import DeleteCollection from "../collection/DeleteCollection";
import DeleteCollectionCard from "../collection/DeleteCollectionCard";
import DeleteCollectionCardFromLayers from "../collection/DeleteCollectionCardFromLayers";
import DownloadCollection from "../collection/DownloadCollection";
import EditCollectionButton from "../collection/EditCollectionButton";
import EditCollectionForm from "../collection/EditCollectionForm";
import GenerateCollection from "../collection/GenerateCollection";
import GeneratePreviewImages from "../collection/GeneratePreviewImages";
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
  const collection = useSelector(
    (state: any) => state.mainPanelStore.mainPanelData.collectionData
  );

  return (
    <Fragment>
      {/* *****************************collection-buttons-start******************************* */}
      <div className="buttons-container ">
        <DownloadCollection />
        <GenerateCollection
        // key={collection.collectionId}
        // collection={collection}
        />
        <GeneratePreviewImages
        // key={collection.collectionId}
        // collection={collection}
        />
        <EditCollectionButton />
        <DeleteCollection />
      </div>
      {/* *****************************collection-buttons-end******************************* */}
      {/* ******************************delete-collection-card-start************************* */}
      {mainPanelBodyDataType.type === MainPanelDataType.DeleteCollection && (
        // <DeleteCollectionCardFromLayers collection={collection} />
        <DeleteCollectionCard />
      )}
      {/* ******************************delete-collection-card-end************************* */}
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
