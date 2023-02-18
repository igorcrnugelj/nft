import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { createLayer, getLayers } from "../../store/actions/Layer";
import { setMainPanelBodyDataType } from "../../store/actions/MainPanel";
import MainPanelDataType from "../../enums/MainPanelDataType";

const CreateNewLayerForm = () => {
  const dispatch = useDispatch();
  const mainPanelData = useSelector(
    (state) => state.mainPanelStore.mainPanelData
  );

  const layers = useSelector((state) => state.layers.layers);
  const layerNameRef = useRef();
  const layerDescriptionRef = useRef();
  const layerRarityRef = useRef<null | HTMLInputElement>(null);

  const createNewLayerHandler = async () => {
    let layerOrder = 1;
    if (layers.length > 0) {
      const max = layers.reduce((prev, current) =>
        prev.order > current.order ? prev : current
      );
      layerOrder = parseInt(max.order + 1);
    }
    const layerName = layerNameRef.current?.value;
    const layerDescription = layerDescriptionRef.current.value;
    const layerRarity = parseInt(layerRarityRef.current.value);

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
        <input
          type="text"
          className="create-new-layer-input-field"
          ref={layerNameRef}
        />
      </div>
      <div className="create-new-layer-description-container">
        <div className="create-new-layer-text">Layer description</div>
        <input
          type="text"
          className="create-new-layer-input-field"
          ref={layerDescriptionRef}
        />
      </div>
      <div className="create-new-layer-rarity-container">
        <div className="create-new-layer-text">Layer rarity</div>
        <input
          type="text"
          className="create-new-layer-input-field"
          ref={layerRarityRef}
        />
      </div>
      <div className="create-new-layer-create-and-cancel-container">
        <Button
          type="reset"
          className="create-new-layer-button"
          onClick={createNewLayerHandler}
        >
          Create
        </Button>
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
