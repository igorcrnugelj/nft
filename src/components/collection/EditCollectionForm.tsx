import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {
  editCollection,
  getCollections,
} from "../../store/actions/Collection-actions";
import MainPanelDataType from "../../enums/MainPanelDataType";
import {
  setMainPanelBodyDataType,
  setMainPanelData,
} from "../../store/actions/MainPanelActions";
import { activateToast } from "../../store/actions/Notifications-actions";
import Messages from "../../enums/Messages";

const EditCollectionForm = () => {
  const dispatch: any = useDispatch();
  const mainPanelData = useSelector(
    (state: any) => state.mainPanelStore.mainPanelData
  );
  const mainPanelBodyDataType = useSelector(
    (state: any) => state.mainPanelStore.mainPanelBodyDataType
  );
  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");
  const [collectionSize, setCollectionSize] = useState("");

  useEffect(() => {
    if (mainPanelData) {
      setCollectionName(mainPanelData.collectionData.collection.name);
      setCollectionDescription(
        mainPanelData.collectionData.collection.description
      );
      setCollectionSize(mainPanelData.collectionData.collection.collectionSize);
    }
  }, [mainPanelData]);

  const nameChangeHandler = (event: any) => {
    setCollectionName(event.target.value);
  };
  const descriptionChangeHandler = (event: any) => {
    setCollectionDescription(event.target.value);
  };
  const sizeChangeHandler = (event: any) => {
    console.log(typeof event.target.value);
    setCollectionSize(event.target.value);
  };

  const saveChangesHandler = async () => {
    const collection = {
      userId: mainPanelData.collectionData.collection.userId,
      collectionId: mainPanelData.collectionData.collection.collectionId,
      name: collectionName,
      description: collectionDescription,
      collectionSize: parseInt(collectionSize),
    };
    const payload = await dispatch(editCollection(collection)).unwrap();
    if (payload.success) {
      const mainPanelDataEdited = {
        ...mainPanelData,
        collectionData: { collection: payload.data },
        type: MainPanelDataType.LayerImages,
      };
      dispatch(activateToast(Messages.CollectionSuccessfullyEdited));
      dispatch(setMainPanelData(mainPanelDataEdited));
      dispatch(
        setMainPanelBodyDataType({
          type: MainPanelDataType.ShowCollectionDetails,
        })
      );
      dispatch(getCollections());
    } else {
      dispatch(activateToast(Messages.EditCollectionFailed));
    }
  };

  const showCollectionDetailsHandler = () => {
    dispatch(
      setMainPanelBodyDataType({
        type: MainPanelDataType.ShowCollectionDetails,
      })
    );
  };

  return (
    <Fragment>
      {mainPanelBodyDataType.type === MainPanelDataType.EditForm && (
        <Form>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Collection name:</Form.Label>
            <Form.Control
              type="text"
              value={collectionName}
              onChange={nameChangeHandler}
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Collection description:</Form.Label>
            <Form.Control
              type="text"
              value={collectionDescription}
              onChange={descriptionChangeHandler}
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Number of collections to generate:</Form.Label>
            <Form.Control
              type="number"
              value={collectionSize}
              onChange={sizeChangeHandler}
            />
          </Form.Group>
          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button
                type="reset"
                className="btn btn-success mr-2"
                onClick={saveChangesHandler}
              >
                Save Changes
              </Button>
              <Button
                type="reset"
                className="btn btn-success mr-2"
                onClick={showCollectionDetailsHandler}
              >
                CANCEL
              </Button>
            </Col>
          </Form.Group>
        </Form>
      )}
    </Fragment>
  );
};

export default EditCollectionForm;
