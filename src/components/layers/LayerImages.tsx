import React, { Fragment, useEffect } from "react";
import LayerImage from "./LayerImage";

const LayerImages = (images: any) => {
  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <Fragment>
      {images.images && (
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
