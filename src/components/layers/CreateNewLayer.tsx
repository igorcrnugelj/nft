import React, { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { createLayer, getLayers } from "../../store/actions/Layer-actions";
import { setMainPanelBodyDataType } from "../../store/actions/MainPanelActions";
import MainPanelDataType from "../../enums/MainPanelDataType";
import CreateNewLayerForm from "./CreateNewLayerForm";

const CreateNewLayer = () => {
  const dispatch: any = useDispatch();
  const mainPanelData = useSelector(
    (state: any) => state.mainPanelStore.mainPanelData
  );
  const mainPanelBodyDataType = useSelector(
    (state: any) => state.mainPanelStore.mainPanelBodyDataType
  );
  const layers = useSelector((state: any) => state.layers.layers);
  const [createNewLayerButtonClicked, setCreateNewLayerButtonClicked] =
    useState(false);
  const layerNameRef = useRef<any>();
  const layerDescriptionRef = useRef<any>();
  const layerRarityRef = useRef<null | HTMLInputElement>(null);

  const showCreateLayerForm = () => {
    // setCreateNewLayerButtonClicked(true);
    dispatch(
      setMainPanelBodyDataType({
        type: MainPanelDataType.ShowCreateNewLayerForm,
      })
    );
  };

  const createNewLayerHandler = async () => {
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
    setCreateNewLayerButtonClicked(false);
  };

  const cancelCreateNewLayerHandler = () => {
    setCreateNewLayerButtonClicked(false);
  };

  return (
    <Fragment>
      {/* {createNewLayerButtonClicked && ( */}
      {mainPanelBodyDataType.type ===
        MainPanelDataType.ShowCreateNewLayerForm && (
        <CreateNewLayerForm />
        // <div className="create-new-layer-form-main-container">
        //   <div className="create-new-layer-name-container">
        //     <div className="create-new-layer-text">Layer name</div>
        //     <input
        //       type="text"
        //       className="create-new-layer-input-field"
        //       // placeholder="Enter collection description"
        //       ref={layerNameRef}
        //     />
        //   </div>
        //   <div className="create-new-layer-description-container">
        //     <div className="create-new-layer-text">Layer description</div>
        //     <input
        //       type="text"
        //       className="create-new-layer-input-field"
        //       // placeholder="Enter collection description"
        //       ref={layerDescriptionRef}
        //     />
        //   </div>
        //   <div className="create-new-layer-rarity-container">
        //     <div className="create-new-layer-text">Layer rarity</div>
        //     <input
        //       type="text"
        //       className="create-new-layer-input-field"
        //       // placeholder="Enter collection description"
        //       ref={layerRarityRef}
        //     />
        //   </div>
        //   <div className="create-new-layer-create-and-cancel-container">
        //     <Button
        //       type="reset"
        //       className="create-new-layer-button"
        //       onClick={createNewLayerHandler}
        //     >
        //       Create
        //     </Button>
        //     <Button
        //       type="reset"
        //       className="cancel-create-new-layer-button"
        //       onClick={cancelCreateNewLayerHandler}
        //     >
        //       Cancel
        //     </Button>
        //   </div>
        // </div>
      )}

      {/* ************************************************************************** */}

      {/* {createNewLayerButtonClicked && (
        <Form>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Layer name</Form.Label>
            <Form.Control type="text" ref={layerNameRef} />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Layer description</Form.Label>
            <Form.Control type="text" ref={layerDescriptionRef} />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Layer rarity</Form.Label>
            <Form.Control type="text" ref={layerRarityRef} />
          </Form.Group>
          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button
                type="reset"
                className="btn btn-success mr-2"
                onClick={createNewLayerHandler}
              >
                Create
              </Button>
              <Button
                type="reset"
                className="btn btn-success mr-2"
                onClick={cancelCreateNewLayerHandler}
              >
                CANCEL
              </Button>
            </Col>
          </Form.Group>
        </Form>
      )} */}
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
