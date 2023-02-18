import { useDispatch } from "react-redux";
import MainPanelDataType from "../../enums/MainPanelDataType";
import { setMainPanelBodyDataType } from "../../store/actions/MainPanel";

const EditCollectionButton = () => {
  const dispatch = useDispatch();

  const showEditCollectionForm = () => {
    dispatch(
      setMainPanelBodyDataType({
        type: MainPanelDataType.EditForm,
      })
    );
  };

  return (
    <div>
      <button
        type="button"
        className="edit-collection-button"
        onClick={showEditCollectionForm}
      >
        EDIT COLLECTION
      </button>
    </div>
  );
};

export default EditCollectionButton;
