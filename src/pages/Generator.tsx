import { Fragment } from "react";
import CreateNewCollectionForm from "../components/collection/CreateNewCollectionForm";
import HeaderGenerator from "../components/collection/HeaderGenerator";

const Generator = () => {
  return (
    <Fragment>
      <HeaderGenerator />

      <CreateNewCollectionForm />
      <div className="main-panel"></div>
    </Fragment>
  );
};

export default Generator;
