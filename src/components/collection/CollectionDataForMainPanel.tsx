import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import MainPanelDataType from "../../enums/MainPanelDataType";
import DeleteCollectionCard from "./DeleteCollectionCard";
import EditCollectionForm from "./EditCollectionForm";

const CollectionDataForMainPanel = (collection: any) => {
  const mainPanelBodyDataType = useSelector(
    (state: any) => state.mainPanelStore.mainPanelBodyDataType
  );

  return (
    <Fragment>
      {mainPanelBodyDataType.type !== MainPanelDataType.EditForm && (
        <div className="data-about-collection">
          <div className="collection-name-container">
            <div className="collection-name-text-div">
              <div className="collection-name-text">Collection name:</div>
            </div>
            <div className="collection-name">
              {collection.collection.collection.collection.name}
            </div>
          </div>
          <div className="collection-description-container">
            <div className="collection-description-text-div">
              <div className="collection-description-text">
                Collection description:
              </div>
            </div>
            <div className="collection-description">
              {collection.collection.collection.collection.description}
            </div>
          </div>
          <div className="number-of-nfts-container">
            <div className="number-of-nfts-text-div">
              <div className="number-of-nfts-text">
                Number of NFTs to generate:
              </div>
            </div>
            <div className="number-of-nfts">
              {collection.collection.collection.collection.collectionSize}
            </div>
          </div>
        </div>
      )}

      {mainPanelBodyDataType.type === MainPanelDataType.EditForm && (
        <EditCollectionForm />
      )}

      {mainPanelBodyDataType.type === MainPanelDataType.DeleteCollection && (
        <DeleteCollectionCard />
      )}

      {mainPanelBodyDataType.type === MainPanelDataType.Deleted && <></>}
    </Fragment>
  );
};

export default CollectionDataForMainPanel;
