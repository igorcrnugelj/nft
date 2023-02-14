import { Fragment } from "react";
import { useSelector } from "react-redux";
import MainPanelDataType from "../../enums/MainPanelDataType";
import DeleteCollectionCard from "../collection/DeleteCollectionCard";
import DownloadCollection from "../collection/DownloadCollection";
import EditCollectionButton from "../collection/EditCollectionButton";
import EditCollectionForm from "../collection/EditCollectionForm";
import GenerateCollection from "../collection/GenerateCollection";
import GeneratePreviewImages from "../collection/GeneratePreviewImages";
import AddNewImage from "./AddNewImage";
import EditLayerForm from "./EditLayerForm";
import LayerData from "./LayerData";
import LayerImages from "./LayerImages";

const LayerPreview = (layerData: any) => {
  const mainPanelBodyDataType = useSelector(
    (state: any) => state.mainPanelStore.mainPanelBodyDataType
  );

  return (
    <Fragment>
      {/* *****************************collection-buttons-start******************************* */}
      <div className="buttons-container ">
        <DownloadCollection />
        <GenerateCollection />
        <GeneratePreviewImages />
        <EditCollectionButton />
        <DeleteCollectionCard />
      </div>
      {/* *****************************collection-buttons-end******************************* */}
      <EditCollectionForm />
      {mainPanelBodyDataType.type === MainPanelDataType.ShowLayerEditForm && (
        <EditLayerForm />
      )}
      {mainPanelBodyDataType.type !== MainPanelDataType.DeleteLayer &&
        mainPanelBodyDataType.type !== MainPanelDataType.ShowLayerEditForm && (
          <LayerData layerData={layerData} />
        )}
      <AddNewImage />

      <LayerImages images={layerData.layerData.images} />
    </Fragment>
  );
};

export default LayerPreview;
