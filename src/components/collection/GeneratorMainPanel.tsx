import React from "react";
// import "../../css/generator/generator-main-panel.scss";
import AccordionCollection from "./AccordionCollection";
import CollectionMainPanel from "./CollectionMainPanel";

const GeneratorMainPanel = () => {
  return (
    <div className="main-panel-container">
      <div className="accordion-container">
        {/* <div className="d-flex flex-row"> */}
        {/* <div className="generator-main-panel-image-container">
            <div className="generator-main-panel-img"></div>
          </div> */}
        <div className="accordion-title">My collections</div>
        {/* </div> */}
        {/* <div className="stroke"></div> */}
        <AccordionCollection />
        {/* <CollectionMainPanel /> */}
      </div>
      <div className="main-panel">
        <CollectionMainPanel />
      </div>
    </div>
  );
};

export default GeneratorMainPanel;
