import React from "react";
import AccordionCollection from "./AccordionCollection";
import CollectionMainPanel from "./CollectionMainPanel";

const GeneratorMainPanel = () => {
  return (
    <div className="main-panel-container">
      <div className="accordion-container">
        <div className="accordion-title">My collections</div>
        <AccordionCollection />
      </div>
      <div className="main-panel">
        <CollectionMainPanel />
      </div>
    </div>
  );
};

export default GeneratorMainPanel;
