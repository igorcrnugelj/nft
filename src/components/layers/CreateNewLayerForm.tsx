import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { createLayer, getLayers } from "../../store/actions/Layer-actions";
import { setMainPanelBodyDataType } from "../../store/actions/MainPanelActions";
import MainPanelDataType from "../../enums/MainPanelDataType";

const CreateNewLayerForm = () => {
  const dispatch: any = useDispatch();
  const mainPanelData = useSelector(
    (state: any) => state.mainPanelStore.mainPanelData
  );
  const [nameInputFieldNotification, setNameInputFieldNotification] =
    useState(false);
  const [
    descriptionInputFieldNotification,
    setDescriptionInputFieldNotification,
  ] = useState(false);
  const [rarityInputFieldNotification, setRarityInputFieldNotification] =
    useState(false);
  const [nameInputFieldMessage, setNameInputFieldMessage] = useState("");
  const [descriptionInputFieldMessage, setDescriptionInputFieldMessage] =
    useState("");
  const [rarityInputFieldMessage, setRarityInputFieldMessage] = useState("");
  const [nameInputLength, setNameInputLength] = useState(0);
  const [descriptionInputLength, setDescriptionInputLength] = useState(0);
  const [rarityInputLength, setRarityInputLength] = useState(0);

  const layers = useSelector((state: any) => state.layers.layers);
  const layerNameRef = useRef<any>();
  const layerDescriptionRef = useRef<any>();
  const layerRarityRef = useRef<null | HTMLInputElement>(null);

  const validateNameInputField = (event: any) => {
    setNameInputLength(event.target.value.length);
    if (event.target.value.length > 5) {
      setNameInputFieldNotification(true);
      setNameInputFieldMessage(
        event.target.value.length - 5 + " " + "characters over 5!"
      );
    } else {
      setNameInputFieldNotification(false);
    }
  };
  const validateDescriptionInputField = (event: any) => {
    setDescriptionInputLength(event.target.value.length);
    if (event.target.value.length > 5) {
      setDescriptionInputFieldNotification(true);
      setDescriptionInputFieldMessage(
        event.target.value.length - 5 + " " + "characters over 5!"
      );
    } else {
      setDescriptionInputFieldNotification(false);
    }
  };
  const validateRarityInputField = (event: any) => {
    setRarityInputLength(event.target.value.length);
    if (event.target.value < 1 || event.target.value > 100) {
      setRarityInputFieldNotification(true);
      setRarityInputFieldMessage("* rarity value must be between 1-100");
    } else {
      setRarityInputFieldNotification(false);
    }
  };

  const createNewLayerHandler = async () => {
    if (nameInputLength === 0) {
      setNameInputFieldNotification(true);
      setNameInputFieldMessage("* field must not be empty!");
      return;
    }
    if (descriptionInputLength === 0) {
      setDescriptionInputFieldNotification(true);
      setDescriptionInputFieldMessage("* field must not be empty!");
      return;
    }
    if (rarityInputLength === 0) {
      setRarityInputFieldNotification(true);
      setRarityInputFieldMessage("* field must not be empty!");
      return;
    }

    let layerOrder = 1;
    if (layers.length > 0) {
      const max = layers.reduce((prev: any, current: any) =>
        prev.order > current.order ? prev : current
      );
      layerOrder = parseInt(max.order + 1);
    }
    const layerName = layerNameRef.current?.value;
    const layerDescription = layerDescriptionRef.current?.value;
    const layerRarity = parseInt(layerRarityRef.current?.value!);

    const layer = {
      collectionId: mainPanelData.collectionData.collection.collectionId,
      name: layerName,
      description: layerDescription,
      order: layerOrder,
      layerRarity: layerRarity,
    };
    const createLayerResponse = await dispatch(createLayer(layer)).unwrap();
    if (createLayerResponse.success) {
      dispatch(getLayers(mainPanelData.collectionData.collection.collectionId));
    }
    dispatch(
      setMainPanelBodyDataType({
        type: MainPanelDataType.CloseCreateNewLayerForm,
      })
    );
  };

  const cancelCreateNewLayerHandler = () => {
    dispatch(
      setMainPanelBodyDataType({
        type: MainPanelDataType.CloseCreateNewLayerForm,
      })
    );
  };

  return (
    <div className="create-new-layer-form-main-container">
      <div className="create-new-layer-name-container">
        <div className="create-new-layer-text">Layer name</div>
        {nameInputFieldNotification && (
          <p className="create-new-layer-input-field-notification">
            {nameInputFieldMessage}
          </p>
        )}
        <input
          type="text"
          className="create-new-layer-input-field"
          ref={layerNameRef}
          onChange={validateNameInputField}
        />
      </div>
      <div className="create-new-layer-description-container">
        <div className="create-new-layer-text">Layer description</div>
        {descriptionInputFieldNotification && (
          <p className="create-new-layer-input-field-notification">
            {descriptionInputFieldMessage}
          </p>
        )}
        <input
          type="text"
          className="create-new-layer-input-field"
          ref={layerDescriptionRef}
          onChange={validateDescriptionInputField}
        />
      </div>
      <div className="create-new-layer-rarity-container">
        <div className="create-new-layer-text">Layer rarity</div>
        {rarityInputFieldNotification && (
          <p className="create-new-layer-input-field-notification">
            {rarityInputFieldMessage}
          </p>
        )}
        <input
          type="number"
          className="create-new-layer-input-field"
          ref={layerRarityRef}
          onChange={validateRarityInputField}
        />
      </div>
      <div className="create-new-layer-create-and-cancel-container">
        {nameInputFieldNotification || descriptionInputFieldNotification ? (
          <Button
            type="reset"
            className="create-new-layer-button"
            onClick={createNewLayerHandler}
            disabled
          >
            Create
          </Button>
        ) : (
          <Button
            type="reset"
            className="create-new-layer-button"
            onClick={createNewLayerHandler}
          >
            Create
          </Button>
        )}
        <Button
          type="reset"
          className="cancel-create-new-layer-button"
          onClick={cancelCreateNewLayerHandler}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CreateNewLayerForm;
