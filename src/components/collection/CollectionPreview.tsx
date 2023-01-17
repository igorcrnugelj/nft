import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MainPanelDataType from "../../enums/MainPanelDataType";
import CreateNewLayerForm from "../layers/CreateNewLayerForm";
import CollectionDataForMainPanel from "./CollectionDataForMainPanel";
import CollectionPreviewImage from "./CollectionPreviewImage";
import DeleteCollectionCard from "./DeleteCollectionCard";
import DownloadCollection from "./DownloadCollection";
import EditCollectionButton from "./EditCollectionButton";
import GenerateCollection from "./GenerateCollection";
import GeneratePreviewImages from "./GeneratePreviewImages";

const CollectionPreview = (collection: any) => {
  const mainPanelBodyDataType = useSelector(
    (state: any) => state.mainPanelStore.mainPanelBodyDataType
  );

  return (
    <Fragment>
      <div className="buttons-container ">
        <DownloadCollection />
        <GenerateCollection />
        <GeneratePreviewImages
          key={collection.collectionId}
          collection={collection}
        />
        <EditCollectionButton />
        <DeleteCollectionCard />
      </div>

      <CollectionDataForMainPanel collection={collection} />

      {/* {mainPanelBodyDataType.type ===
        MainPanelDataType.ShowCreateNewLayerForm && <CreateNewLayerForm />} */}

      <div className="preview-images-container">
        {collection.collection.collection.previewImages?.map(
          (previewImage: any) => (
            <CollectionPreviewImage
              key={previewImage.previewImageId}
              previewImage={previewImage}
            />
          )
        )}
      </div>
    </Fragment>
  );
};

export default CollectionPreview;
