import React, { Fragment, useEffect } from "react";
import LayerImage from "./LayerImage";
import Row from "react-bootstrap/Row";

const LayerImages = (images: any) => {
  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <Fragment>
      {images.images && (
        // <Row className='justify-content-md-left'>
        //   {images.images.map((image: any) => (
        //     <LayerImage key={image.imageId} image={image} images={images} />
        //   ))}
        // </Row>
        <div className="layer-images-container">
          {images.images.map((image: any) => (
            <LayerImage key={image.imageId} image={image} images={images} />
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default LayerImages;
