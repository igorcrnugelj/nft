import { useRef, Fragment, useState } from "react";
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
  const user = useSelector((state: any) => state.loginStore.user);
  const [nameInputFieldNotification, setNameInputFieldNotification] =
    useState(false);
  const [
    descriptionInputFieldNotification,
    setDescriptionInputFieldNotification,
  ] = useState(false);
  const [sizeInputFieldNotification, setSizeInputFieldNotification] =
    useState(false);
  const [nameInputFieldMessage, setNameInputFieldMessage] = useState("");
  const [descriptionInputFieldMessage, setDescriptionInputFieldMessage] =
    useState("");
  const [sizeInputFieldMessage, setSizeInputFieldMessage] = useState("");
  const [nameInputLength, setNameInputLength] = useState(0);
  const [descriptionInputLength, setDescriptionInputLength] = useState(0);
  const [sizeInputLength, setSizeInputLength] = useState(0);

  const nameInputRef = useRef<any>();
  const descriptionInputRef = useRef<any>();
  const sizeInputRef = useRef<any>();

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
  const validateSizeInputField = (event: any) => {
    setSizeInputLength(event.target.value.length);
    setSizeInputFieldNotification(false);
  };

  const createCollectionHandler = async () => {
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
    if (sizeInputLength === 0) {
      setSizeInputFieldNotification(true);
      setSizeInputFieldMessage("* field must not be empty!");
      return;
    }

    const collection = {
      userId: user.userId,
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
    nameInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    sizeInputRef.current.value = "";
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
              id="name-input"
              className="name-input-field"
              placeholder="Enter collection name"
              ref={nameInputRef}
              onChange={validateNameInputField}
            />
            {nameInputFieldNotification && (
              <p className="name-input-field-notification">
                {nameInputFieldMessage}
              </p>
            )}
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
              onChange={validateDescriptionInputField}
            />
            {descriptionInputFieldNotification && (
              <p className="name-input-field-notification">
                {descriptionInputFieldMessage}
              </p>
            )}
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
              onChange={validateSizeInputField}
            />
            {sizeInputFieldNotification && (
              <p className="name-input-field-notification">
                {sizeInputFieldMessage}
              </p>
            )}
            <i className="bi bi-pencil-fill bi-pencil-fill-in-create-new-collection-form"></i>
          </div>
          {nameInputFieldNotification || descriptionInputFieldNotification ? (
            <button
              type="button"
              className="create-new-collection-form-button-disabled"
              onClick={createCollectionHandler}
              disabled
            >
              CREATE NEW COLLECTION
            </button>
          ) : (
            <button
              type="button"
              className="create-new-collection-form-button"
              onClick={createCollectionHandler}
            >
              CREATE NEW COLLECTION
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default CreateNewCollectionForm;
