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
      <Card style={{ width: "100%", marginBottom: "20px", border: 0 }}>
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
      </Card>
    </Fragment>
  );
};

export default LayerData;
