import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
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

const DeleteCollectionCard = (collection: any) => {
  const dispatch: any = useDispatch();

  const deleteCollectionHandler = async () => {
    const { userId, collectionId } =
      collection.collection.collection.collection.collection;
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
  };

  return (
    <Fragment>
      <div className="delete-collection-card-main-container">
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
      </div>
      {/* ***************************************************************************** */}
      {/* <Form>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Do you really want delete collection?</Form.Label>
        </Form.Group>

        <div>
          <button
            type="reset"
            className="btn btn-success mr-2"
            onClick={deleteCollectionHandler}
          >
            DELETE COLLECTION
          </button>
        </div>
        <div>
          <button
            type="reset"
            className="btn btn-success mr-2"
            onClick={showCollectionDetailsHandler}
          >
            CANCEL
          </button>
        </div>
      </Form> */}
    </Fragment>
  );
};

export default DeleteCollectionCard;
