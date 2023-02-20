import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNftClientToken } from "../AxiosClient";
import CreateNewCollectionForm from "../components/collection/CreateNewCollectionForm";
import GeneratorHeader from "../components/collection/GeneratorHeader";
import GeneratorMainPanel from "../components/collection/GeneratorMainPanel";
import MainPanelDataType from "../enums/MainPanelDataType";
import { getCollections } from "../store/actions/Collection-actions";
import { refreshUser } from "../store/actions/LoginActions";
import { setMainPanelBodyDataType } from "../store/actions/MainPanelActions";

const Generator = () => {
  const dispatch: any = useDispatch();

  const user = useSelector((state: any) => state.loginStore.user);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      dispatch(refreshUser(user));
    } else {
      dispatch(
        setMainPanelBodyDataType({
          type: MainPanelDataType.ShowLoginForm,
        })
      );
    }
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(getCollections());
    }
  }, [user]);

  return (
    <Fragment>
      <GeneratorHeader />
      <CreateNewCollectionForm />
      <GeneratorMainPanel />
    </Fragment>
  );
};

export default Generator;
