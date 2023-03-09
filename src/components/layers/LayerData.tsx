import { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";

const LayerData = (layerData: any) => {
  return (
    <Fragment>
      <div className="data-about-layer">
        <div className="layer-data-name-container">
          <div className="layer-data-name-text-div">
            <div className="layer-data-name-text">Layer name:</div>
          </div>
          <div className="layer-data-name">
            {layerData.layerData.layerData.data.name}
          </div>
        </div>
        <div className="layer-data-description-container">
          <div className="layer-data-description-text-div">
            <div className="layer-data-description-text">
              Layer description:
            </div>
          </div>
          <div className="layer-data-description">
            {layerData.layerData.layerData.data.description}
          </div>
        </div>
        <div className="layer-data-size-container">
          <div className="layer-data-size-text-div">
            <div className="layer-data-size-text">Layer rarity:</div>
          </div>
          <div className="layer-data-size">
            {layerData.layerData.layerData.data.layerRarity}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LayerData;
