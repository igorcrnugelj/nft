import React, { Fragment, useEffect } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/css/bootstrap.css'
import Card from "react-bootstrap/Card";

const CollectionPreviewImage = (previewImage: any) => {
  return (
    <Fragment>
      <div className="col">
        <Card style={{ width: "20rem" }}>
          <Card.Img variant="top" src={previewImage.previewImage.url} />
          <Card.Title>{previewImage.previewImage.name}</Card.Title>
          <Card.Body></Card.Body>
        </Card>
      </div>
    </Fragment>
  );
};

export default CollectionPreviewImage;
