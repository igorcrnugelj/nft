import React, { useRef, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../css/form/style.css";
import MainPanelDataType from "../../enums/MainPanelDataType";
import { setMainPanelBodyDataType } from "../../store/actions/MainPanel";

const CreateNewCollectionForm = () => {
  const dispatch = useDispatch();
  const nameInputRef = useRef();
  const descriptionInputRef = useRef();
  const sizeInputRef = useRef();

  const createCollectionHandler = async () => {
    //Treba provjeriti je li user već ulogiran, ako nije onda ide ovaj kod:
    dispatch(
      setMainPanelBodyDataType({
        type: MainPanelDataType.ShowLoginForm,
      })
    );
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
