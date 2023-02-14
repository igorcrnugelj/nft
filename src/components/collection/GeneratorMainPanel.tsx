import { useSelector } from "react-redux";
import MainPanelDataType from "../../enums/MainPanelDataType";
import LoginForm from "../login/LoginForm";
import AccordionCollection from "./AccordionCollection";
import CollectionMainPanel from "./CollectionMainPanel";

const GeneratorMainPanel = () => {
  const mainPanelBodyDataType = useSelector(
    (state: any) => state.mainPanelStore.mainPanelBodyDataType
  );
  return (
    <div className="main-panel-container">
      <div className="accordion-container">
        <div className="accordion-title">My collections</div>
        <AccordionCollection />
      </div>
      <div className="main-panel">
        <CollectionMainPanel />

        {mainPanelBodyDataType.type === MainPanelDataType.ShowLoginForm && (
          <LoginForm />
        )}
      </div>
    </div>
  );
};

export default GeneratorMainPanel;
