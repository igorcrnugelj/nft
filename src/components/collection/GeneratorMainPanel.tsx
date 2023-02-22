import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MainPanelDataType from "../../enums/MainPanelDataType";
import LoginForm from "../login/LoginForm";
import AccordionCollection from "./AccordionCollection";
import CollectionMainPanel from "./CollectionMainPanel";

const GeneratorMainPanel = () => {
  const mainPanelBodyDataType = useSelector(
    (state: any) => state.mainPanelStore.mainPanelBodyDataType
  );
  const isUnauthorizedError = useSelector(
    (state: any) => state.loginStore.unauthorizedErrorData
  );

  return (
    <div className="main-panel-container">
      <div className="accordion-container">
        <div className="accordion-title">My collections</div>
        {isUnauthorizedError === false && <AccordionCollection />}
      </div>
      <div className="main-panel">
        {isUnauthorizedError === false && <CollectionMainPanel />}
        {mainPanelBodyDataType.type === MainPanelDataType.ShowLoginForm ||
          (isUnauthorizedError === true && <LoginForm />)}
      </div>
    </div>
  );
};

export default GeneratorMainPanel;
