import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMainPanelBodyDataType } from "../../store/actions/MainPanelActions";
import MainPanelDataType from "../../enums/MainPanelDataType";
import CreateNewLayerForm from "./CreateNewLayerForm";

const CreateNewLayer = () => {
  const dispatch: any = useDispatch();
  const mainPanelBodyDataType = useSelector(
    (state: any) => state.mainPanelStore.mainPanelBodyDataType
  );

  const showCreateLayerForm = () => {
    dispatch(
      setMainPanelBodyDataType({
        type: MainPanelDataType.ShowCreateNewLayerForm,
      })
    );
  };

  return (
    <Fragment>
      {mainPanelBodyDataType.type ===
        MainPanelDataType.ShowCreateNewLayerForm && <CreateNewLayerForm />}

      {mainPanelBodyDataType.type !==
        MainPanelDataType.ShowCreateNewLayerForm && (
        <div className="add-new-layer-button-container">
          <button
            type="reset"
            className="add-new-layer-button"
            onClick={showCreateLayerForm}
          >
            ADD NEW LAYER
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default CreateNewLayer;
