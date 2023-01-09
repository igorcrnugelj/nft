import { Fragment } from "react";
import AccordionCollection from "../components/collection/AccordionCollection";
import CreateNewCollectionForm from "../components/collection/CreateNewCollectionForm";
import GeneratorHeader from "../components/collection/GeneratorHeader";
import GeneratorMainPanel from "../components/collection/GeneratorMainPanel";

const Generator = () => {
  return (
    <Fragment>
      <GeneratorHeader />
      <CreateNewCollectionForm />
      <GeneratorMainPanel />
    </Fragment>
  );
};

export default Generator;
