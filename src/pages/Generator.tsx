import { Fragment } from "react";
import "../css/generator/generator.scss";
import CreateNewCollectionForm from "../components/collection/CreateNewCollectionForm";

const Generator = () => {
  return (
    <Fragment>
      <div className="generator-image-and-title">
        <p className="generator-logo">
          d<span className="generator-logo-span">3</span>vlab
        </p>
        <p className="generator-title">NFT Generator</p>
        <div id="stage">
          <div id="spinner">
            <img
              className="img-1"
              // style="-webkit-transform: rotateY(0deg) translateX(180px); padding: 0 0 0 160px;"
              src="media/img/2-outfit.png"
              // width="200"
              // height="160"
              // alt=""
            />
            <img
              className="img-2"
              // style="-webkit-transform: rotateY(-72deg) translateX(180px); padding: 0 0 0 147px;"
              src="media/img/1-mouth.png"
              // width="213"
              // height="160"
              // alt=""
            />
            <img
              className="img-3"
              // style="-webkit-transform: rotateY(-144deg) translateX(180px); padding: 0 0 0 120px;"
              src="media/img/5-eyes.png"
              // width="240"
              // height="160"
              // alt=""
            />
            <img
              className="img-4"
              // style="-webkit-transform: rotateY(-216deg) translateX(180px); padding: 0 0 0 147px;"
              src="media/img/2-glasses.png"
              // width="213"
              // height="160"
              // alt=""
            />
            <img
              className="img-5"
              // style="-webkit-transform: rotateY(-288deg) translateX(180px); padding: 0 0 0 122px;"
              src="media/img/1-body.png"
              width="238"
              height="160"
              alt=""
            />
          </div>
        </div>
        {/* <p className="generator-description">
          Start a new project by creating your first collection
        </p> */}
      </div>
      <CreateNewCollectionForm />
      <div className="main-panel"></div>
    </Fragment>
  );
};

export default Generator;
