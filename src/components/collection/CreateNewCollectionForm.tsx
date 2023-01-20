import React, { useRef, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCollection,
  getCollections,
} from "../../store/actions/Collection-actions";
import { setLayersInitialState } from "../../store/actions/Layer-actions";
import Messages from "../../enums/Messages";
import { activateToast } from "../../store/actions/Notifications-actions";
import "../../css/form/style.css";

const CreateNewCollectionForm = () => {
  const dispatch: any = useDispatch();
  const userId = useSelector(
    (state: any) => state.collectionsStore.user.userId
  );

  const nameInputRef = useRef<any>();
  const descriptionInputRef = useRef<any>();
  const sizeInputRef = useRef<any>();

  const createCollectionHandler = async () => {
    const collection = {
      userId: userId,
      name: nameInputRef.current.value,
      description: descriptionInputRef.current.value,
      collectionSize: parseInt(sizeInputRef.current.value),
    };
    const payload = await dispatch(createCollection(collection)).unwrap();
    if (payload.success) {
      const payload2 = await dispatch(getCollections()).unwrap();
      if (payload2) {
        dispatch(setLayersInitialState(null));
      }
    } else {
      const message = Messages.CreateCollectionFailed;
      dispatch(activateToast(message));
    }
  };

  return (
    <Fragment>
      <div className="main-form-container">
        <p className="form-description">
          Start a new project by creating your first collection
        </p>
        <div className="create-new-collection-form-container">
          <div className="name-container">
            <div className="create-new-collection-form-name-text">Name:</div>
            <input
              type="text"
              className="name-input-field"
              placeholder="Enter collection name"
              ref={nameInputRef}
            />
            <i className="bi bi-pencil-fill bi-pencil-fill-in-create-new-collection-form"></i>
          </div>
          <div className="description-container">
            <div className="create-new-collection-form-description-text">
              Description:
            </div>
            <input
              type="text"
              className="description-input-field"
              placeholder="Enter collection description"
              ref={descriptionInputRef}
            />
            <i className="bi bi-pencil-fill bi-pencil-fill-in-create-new-collection-form"></i>
          </div>
          <div className="collection-size-container">
            <div className="create-new-collection-form-collection-size-text">
              Collection size:
            </div>
            <input
              type="number"
              className="collection-size-input-field"
              placeholder="Enter number of NFTs to create"
              ref={sizeInputRef}
            />
            <i className="bi bi-pencil-fill bi-pencil-fill-in-create-new-collection-form"></i>
          </div>
          <button
            type="button"
            className="create-new-collection-form-button"
            onClick={createCollectionHandler}
          >
            CREATE NEW COLLECTION
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateNewCollectionForm;
