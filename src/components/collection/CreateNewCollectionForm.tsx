import React, { useRef, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCollection,
  getCollections,
} from "../../store/actions/Collection-actions";
import { setLayersInitialState } from "../../store/actions/Layer-actions";
import Messages from "../../enums/Messages";
import { activateToast } from "../../store/actions/Notifications-actions";
import "../../assets/style.css";
import "../../assets/components/design/create-new-collection-form.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

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
            <p>Name:</p>
            <input
              type="text"
              className="name-input-field"
              placeholder="Enter collection name"
              ref={nameInputRef}
            />
            <i className="bi bi-pencil-fill"></i>
          </div>
          <div className="description-container">
            <p>Description:</p>
            <input
              type="text"
              className="description-input-field"
              placeholder="Enter collection description"
              ref={descriptionInputRef}
            />
            <i className="bi bi-pencil-fill"></i>
          </div>
          <div className="collection-size-container">
            <p>Collection size:</p>
            <input
              type="number"
              className="collection-size-input-field"
              placeholder="Enter number of collections you want to create"
              ref={sizeInputRef}
            />
            <i className="bi bi-pencil-fill"></i>
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
      {/* <div className="collection-data-text">Collection Data:</div> */}

      {/* <form className="form">
        <div className="card-body">
          <div className="form-group row">
            <label className="col-lg-1 col-form-label text-lg-right">
              Create Collection:
            </label>
            <label className="col-lg-1 col-form-label text-lg-right">
              Name:
            </label>
            <div className="col-lg-1">
              <input
                type="text"
                className="form-control"
                placeholder="Enter collection name"
                ref={nameInputRef}
              />
            </div>
            <label className="col-lg-1 col-form-label text-lg-right">
              Description:
            </label>
            <div className="col-lg-1">
              <input
                type="text"
                className="form-control"
                placeholder="Enter collection description"
                ref={descriptionInputRef}
              />
            </div>
            <label className="col-lg-2 col-form-label text-lg-right">
              Collection size:
            </label>
            <div className="col-lg-1">
              <input
                type="number"
                className="form-control"
                placeholder="Collection size:"
                ref={sizeInputRef}
              />
            </div>
            <div className="col-lg-4">
              <button
                type="button"
                className="btn btn-success mr-2"
                onClick={createCollectionHandler}
              >
                CREATE NEW COLLECTION
              </button>
            </div>
          </div>
        </div>
      </form> */}
    </Fragment>
  );
};

export default CreateNewCollectionForm;
