import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import MainPanelDataType from "../../enums/MainPanelDataType";
import {
  setMainPanelBodyDataType,
  setMainPanelData,
} from "../../store/actions/MainPanelActions";
import { activateToast } from "../../store/actions/Notifications-actions";
import Messages from "../../enums/Messages";
import { editLayer, getLayers } from "../../store/actions/Layer-actions";

const EditLayerForm = () => {
  const dispatch: any = useDispatch();
  const mainPanelData = useSelector(
    (state: any) => state.mainPanelStore.mainPanelData
  );

  const [layerName, setLayerName] = useState("");
  const [layerDescription, setLayerDescription] = useState("");
  const [layerRarity, setLayerRarity] = useState("");

  useEffect(() => {
    if (mainPanelData.layerData.data) {
      setLayerName(mainPanelData.layerData.data.name);
      setLayerDescription(mainPanelData.layerData.data.description);
      setLayerRarity(mainPanelData.layerData.data.layerRarity);
    }
  }, [mainPanelData.layerData.data]);

  const layerNameChangeHandler = (event: any) => {
    setLayerName(event.target.value);
  };
  const layerDescriptionChangeHandler = (event: any) => {
    setLayerDescription(event.target.value);
  };
  const layerRarityChangeHandler = (event: any) => {
    setLayerRarity(event.target.value);
  };

  const saveLayerChangesHandler = async () => {
    const layer = {
      collectionId: mainPanelData.layerData.data.collectionId,
      id: mainPanelData.layerData.data.id,
      name: layerName,
      description: layerDescription,
      order: mainPanelData.layerData.data.order,
      layerRarity: parseInt(layerRarity),
    };
    const payload = await dispatch(editLayer(layer)).unwrap();
    if (payload.success) {
      dispatch(getLayers(mainPanelData.layerData.data.collectionId));
      dispatch(
        setMainPanelData({
          collectionData: mainPanelData.collectionData,
          layerData: {
            images: mainPanelData.layerData.images,
            data: layer,
          },
          type: MainPanelDataType.LayerImages,
        })
      );
      dispatch(activateToast(Messages.LayerEditedSuccessfully));
      dispatch(
        setMainPanelBodyDataType({
          type: MainPanelDataType.LayerImages,
        })
      );
    } else {
      dispatch(activateToast(Messages.EditCollectionFailed));
    }
  };
  const showLayerDetailsHandler = () => {
    dispatch(
      setMainPanelBodyDataType({
        type: MainPanelDataType.LayerImages,
      })
    );
  };

  return (
    <Fragment>
      <div className="edit-layer-form-main-container">
        <div className="edit-layer-name-container">
          <div className="edit-layer-text-div">
            <div className="edit-layer-text">Layer name:</div>
          </div>
          <input
            className="edit-layer-input-field"
            type="text"
            value={layerName}
            onChange={layerNameChangeHandler}
          />
        </div>
        <div className="edit-layer-description-container">
          <div className="edit-layer-text-div">
            <div className="edit-layer-text">Layer description:</div>
          </div>
          <input
            className="edit-layer-input-field"
            type="text"
            value={layerDescription}
            onChange={layerDescriptionChangeHandler}
          />
        </div>
        <div className="edit-layer-rarity-container">
          <div className="edit-layer-text-div">
            <div className="edit-layer-text">Layer rarity:</div>
          </div>
          <input
            className="edit-layer-input-field"
            type="number"
            value={layerRarity}
            onChange={layerRarityChangeHandler}
          />
        </div>
        <div className="edit-layer-create-and-cancel-container">
          <Button
            type="reset"
            className="save-changes-layer-button"
            onClick={saveLayerChangesHandler}
          >
            Save changes
          </Button>
          <Button
            type="reset"
            className="cancel-edit-layer-button"
            onClick={showLayerDetailsHandler}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default EditLayerForm;
