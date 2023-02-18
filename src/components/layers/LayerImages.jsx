import { Fragment, useEffect } from "react";
import LayerImage from "./LayerImage";

const LayerImages = (images) => {
  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <Fragment>
      {images.images && (
        <div className="layer-images-container">
          {images.images.map((image) => (
            <LayerImage key={image.imageId} image={image} images={images} />
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default LayerImages;
