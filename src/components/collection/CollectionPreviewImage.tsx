import { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";

const CollectionPreviewImage = (previewImage: any) => {
  return (
    <Fragment>
      <img className="preview-image" src={previewImage.previewImage.url} />
    </Fragment>
  );
};

export default CollectionPreviewImage;
