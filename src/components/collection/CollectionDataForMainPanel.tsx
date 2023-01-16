import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {
  editCollection,
  getCollections,
} from "../../store/actions/Collection-actions";
import MainPanelDataType from "../../enums/MainPanelDataType";
import DeleteCollectionCard from "./DeleteCollectionCard";
import Messages from "../../enums/Messages";
import { activateToast } from "../../store/actions/Notifications-actions";
import {
  setMainPanelBodyDataType,
  setMainPanelData,
} from "../../store/actions/MainPanelActions";

const CollectionDataForMainPanel = (collection: any) => {
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

  useEffect(() => {}, [mainPanelBodyDataType]);

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
    setCollectionSize(event.target.value);
  };
  const editCollectionHandler = async () => {
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
      };
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

  // const showEditCollectionForm = () => {
  //   dispatch(
  //     setMainPanelBodyDataType({
  //       type: MainPanelDataType.EditForm,
  //     })
  //   );
  // };

  const showCollectionDetailsHandler = () => {
    dispatch(
      setMainPanelBodyDataType({
        type: MainPanelDataType.ShowCollectionDetails,
      })
    );
  };

  return (
    <Fragment>
      {mainPanelBodyDataType.type !== MainPanelDataType.EditForm && (
        <div className="data-about-collection">
          {/* <p className="collection-main-title">Collection data</p> */}
          <div className="collection-name-container">
            <div className="collection-name-text-div">
              <div className="collection-name-text">Collection name:</div>
            </div>
            <div className="collection-name">
              {collection.collection.collection.collection.name}
            </div>
          </div>
          <div className="collection-description-container">
            <div className="collection-description-text-div">
              <div className="collection-description-text">
                Collection description:
              </div>
            </div>
            <div className="collection-description">
              {collection.collection.collection.collection.description}
            </div>
          </div>
          <div className="number-of-nfts-container">
            <div className="number-of-nfts-text-div">
              <div className="number-of-nfts-text">
                Number of NFTs to generate:
              </div>
            </div>
            <div className="number-of-nfts">
              {collection.collection.collection.collection.collectionSize}
            </div>
          </div>
          {/* <div>
          <button
          type="button"
          className="edit-collection-button"
          onClick={showEditCollectionForm}
          >
          EDIT COLLECTION
          </button>
        </div> */}
        </div>
      )}

      {/* ************************************************************************************* */}

      {/* {mainPanelBodyDataType.type !== MainPanelDataType.EditForm &&
        mainPanelBodyDataType.type !== MainPanelDataType.DeleteCollection && (
          <Card style={{ width: "100%", marginBottom: "20px", border: 0 }}>
            <Card.Body>
              <Card.Title className="mb-5">
                {collection.collection.collection.collection.name}
              </Card.Title>
              <Card.Subtitle className="mb-2">Description:</Card.Subtitle>
              <Card.Text>
                {collection.collection.collection.collection.description}
              </Card.Text>
              <Card.Subtitle className="mb-2">
                Number of collectios to generate:{" "}
              </Card.Subtitle>
              <Card.Text>
                {collection.collection.collection.collection.collectionSize}
              </Card.Text>
            </Card.Body>

            <div
              className="col mt-0 "
              style={{ textAlign: "start", marginLeft: 30 }}
            >
              <button
                type="button"
                className="btn btn-success mr-2"
                onClick={showEditCollectionForm}
              >
                EDIT COLLECTION
              </button>
            </div>
          </Card>
        )} */}

      {/* *************************************************************************************** */}
      {/* <dl className="row">
        <dt className="col-sm-3">Description lists</dt>
        <dd className="col-sm-9">
          A description list is perfect for defining terms.
        </dd>

        <dt className="col-sm-3">Euismod</dt>
        <dd className="col-sm-9">
          <p>
            Vestibulum id ligula porta felis euismod semper eget lacinia odio
            sem nec elit.
          </p>
          <p>Donec id elit non mi porta gravida at eget metus.</p>
        </dd>

        <dt className="col-sm-3">Malesuada porta</dt>
        <dd className="col-sm-9">
          Etiam porta sem malesuada magna mollis euismod.
        </dd>

        <dt className="col-sm-3 text-truncate">Truncated term is truncated</dt>
        <dd className="col-sm-9">
          Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum
          nibh, ut fermentum massa justo sit amet risus.
        </dd>

        <dt className="col-sm-3">Nesting</dt>
        <dd className="col-sm-9"></dd>
      </dl> */}

      {/* *************************************edit collection form - start *************************************** */}
      {mainPanelBodyDataType.type === MainPanelDataType.EditForm && (
        <div className="edit-collection-form-main-container">
          <div className="edit-collection-name-container">
            <div className="edit-collection-text-div">
              <div className="edit-collection-text">Collection name:</div>
            </div>
            <input
              className="edit-collection-input-field"
              type="text"
              value={collectionName}
              onChange={nameChangeHandler}
            />
          </div>
          <div className="edit-collection-description-container">
            <div className="edit-collection-text-div">
              <div className="edit-collection-text">
                Collection description:
              </div>
            </div>
            <input
              className="edit-collection-input-field"
              type="text"
              value={collectionDescription}
              onChange={descriptionChangeHandler}
            />
          </div>
          <div className="edit-collection-rarity-container">
            <div className="edit-collection-text-div">
              <div className="edit-collection-text">
                {" "}
                Number of NFTs to generate:
              </div>
            </div>
            <input
              className="edit-collection-number-of-collections-input-field"
              type="number"
              value={collectionSize}
              onChange={sizeChangeHandler}
            />
          </div>
          <div className="edit-collection-create-and-cancel-container">
            <Button
              type="reset"
              className="save-changes-collection-button"
              onClick={editCollectionHandler}
            >
              Save changes
            </Button>
            <Button
              type="reset"
              className="cancel-edit-collection-button"
              onClick={showCollectionDetailsHandler}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      {/* *************************************edit collection form - end *************************************** */}
      {/* {mainPanelBodyDataType.type === MainPanelDataType.EditForm && (
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
                onClick={editCollectionHandler}
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
      )} */}

      {mainPanelBodyDataType.type === MainPanelDataType.DeleteCollection && (
        <DeleteCollectionCard collection={collection} />
      )}

      {mainPanelBodyDataType.type === MainPanelDataType.Deleted && <></>}
    </Fragment>
  );
};

export default CollectionDataForMainPanel;
