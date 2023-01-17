import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCollection,
  getCollections,
} from "../../store/actions/Collection-actions";
import {
  setMainPanelBodyDataType,
  setMainPanelData,
} from "../../store/actions/MainPanelActions";
import Form from "react-bootstrap/Form";
import MainPanelDataType from "../../enums/MainPanelDataType";
import { activateToast } from "../../store/actions/Notifications-actions";
import Messages from "../../enums/Messages";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const DeleteCollectionCard = () => {
  const dispatch: any = useDispatch();
  const collection = useSelector(
    (state: any) => state.mainPanelStore.mainPanelData.collectionData
  );
  const [modalShow, setModalShow] = useState(false);

  const deleteCollectionHandler = async () => {
    const { userId, collectionId } = collection.collection;
    setModalShow(false);
    const payload = await dispatch(
      deleteCollection({ userId, collectionId })
    ).unwrap();
    if (payload.success) {
      dispatch(
        setMainPanelBodyDataType({
          type: MainPanelDataType.Deleted,
        })
      );
      dispatch(setMainPanelData(null));
      dispatch(getCollections());
    } else {
      const message = Messages.DeleteCollectionFailed;
      dispatch(activateToast(message));
    }
  };
  const showCollectionDetailsHandler = () => {
    dispatch(
      setMainPanelBodyDataType({
        type: MainPanelDataType.ShowCollectionDetails,
      })
    );
    setModalShow(false);
  };

  return (
    <Fragment>
      <Button
        className="delete-collection-button"
        onClick={() => setModalShow(true)}
      >
        DELETE COLLECTION
      </Button>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <i className="bi bi-trash" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="delete-collection-card-text">
            Do you really want delete collection {collection.collection.name}?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <div className="delete-and-cancel-buttons-container">
            <button
              type="reset"
              className="delete-collection-button-in-card"
              onClick={deleteCollectionHandler}
            >
              DELETE COLLECTION
            </button>
            <button
              type="reset"
              className="cancel-delete-collection-button-in-card"
              onClick={showCollectionDetailsHandler}
            >
              CANCEL
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* ******************************************************************************************** */}
      {/* <div className="delete-collection-card-main-container">
        <div className="delete-collection-card-container">
          <i className="bi bi-trash" />
          <p className="delete-collection-card-text">
            Do you really want delete collection?
          </p>
          <div className="delete-and-cancel-buttons-container">
            <button
              type="reset"
              className="delete-collection-button-in-card"
              onClick={deleteCollectionHandler}
            >
              DELETE COLLECTION
            </button>
            <button
              type="reset"
              className="cancel-delete-collection-button-in-card"
              onClick={showCollectionDetailsHandler}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div> */}
    </Fragment>
  );
};

export default DeleteCollectionCard;
