import React, { Fragment, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";

const LayerData = (layerData: any) => {
  useEffect(() => {
    console.log(layerData);
  }, [layerData]);

  return (
    <Fragment>
      <div className="data-about-layer">
        {/* <p className="layer-main-title">layer data</p> */}
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

      {/* ***************************************************************************************** */}
      {/* <Card style={{ width: "100%", marginBottom: "20px", border: 0 }}>
        <Card.Body>
          <Card.Title className="mb-5">
            {layerData.layerData.layerData.data.name}
          </Card.Title>
          <Card.Subtitle className="mb-2">Description:</Card.Subtitle>
          <Card.Text>
            {layerData.layerData.layerData.data.description}
          </Card.Text>
          <Card.Subtitle className="mb-2">Layer rarity: </Card.Subtitle>
          <Card.Text>
            {layerData.layerData.layerData.data.layerRarity}
          </Card.Text>
        </Card.Body>
      </Card> */}
    </Fragment>
  );
};

export default LayerData;
