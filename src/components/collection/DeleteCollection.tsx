import React from "react";
import { useDispatch } from "react-redux";
import MainPanelDataType from "../../enums/MainPanelDataType";
import { setMainPanelBodyDataType } from "../../store/actions/MainPanelActions";

const DeleteCollection = () => {
  const dispatch: any = useDispatch();

  const deleteCollectionHandler = () => {
    dispatch(
      setMainPanelBodyDataType({
        type: MainPanelDataType.DeleteCollection,
      })
    );
  };

  return (
    <button
      type="reset"
      className="delete-collection-button"
      onClick={deleteCollectionHandler}
    >
      DELETE COLLECTION
    </button>
  );
};

export default DeleteCollection;
