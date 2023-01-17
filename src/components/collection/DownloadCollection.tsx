import React, { Fragment, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import MainPanelDataType from "../../enums/MainPanelDataType";

const DownloadCollection = () => {
  const generatedCollection = useSelector(
    (state: any) => state.collectionsStore.generatedCollection
  );
  const mainPanelBodyDataType = useSelector(
    (state: any) => state.mainPanelStore.mainPanelBodyDataType
  );
  const [generatedCollectionState, setGeneratedCollectionState] = useState();

  useEffect(() => {
    if (generatedCollection) {
      setGeneratedCollectionState(generatedCollection.url);
    }
  }, [generatedCollection]);

  return (
    <Fragment>
      <a
        // className="download-collection-button"
        href={generatedCollectionState}
        target="_blank"
        rel="noopener noreferrer"
        download
      >
        {mainPanelBodyDataType.type ===
          MainPanelDataType.ShowDownloadButton && (
          <Button className="download-collection-button">
            {/* <i className="download-collection-button" /> */}
            DOWNLOAD COLLECTION
          </Button>
        )}
      </a>
    </Fragment>
  );
};

export default DownloadCollection;
