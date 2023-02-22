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
      {isUnauthorizedError === false && (
        <div className="accordion-container">
          <div className="accordion-title">My collections</div>
          <AccordionCollection />
        </div>
      )}
      {isUnauthorizedError === false && (
        <div className="main-panel">
          <CollectionMainPanel />
        </div>
      )}
      {(mainPanelBodyDataType.type === MainPanelDataType.ShowLoginForm ||
        isUnauthorizedError === true) && (
        <div className="main-panel-for-login-form">
          <LoginForm />
        </div>
      )}
    </div>
  );
};

export default GeneratorMainPanel;
