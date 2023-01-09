import React from "react";
import "../../css/generator/generator-main-panel.scss";
import AccordionCollection from "./AccordionCollection";
import CollectionMainPanel from "./CollectionMainPanel";

const GeneratorMainPanel = () => {
  return (
    <div className="main-panel-container">
      <div className="accordion">
        <AccordionCollection />
        {/* <CollectionMainPanel /> */}
      </div>
      <div className="main-panel"></div>
    </div>
  );
};

export default GeneratorMainPanel;
