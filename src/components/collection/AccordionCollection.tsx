import { Fragment } from "react";
import { useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import AccordionHeader from "./AccordionHeader";
import AccordionBody from "../layers/AccordionBody";
import "../../css/accordion/accordion-header.scss";

const AccordionCollection = () => {
  const collections = useSelector(
    (state: any) => state.collectionsStore.collections
  );

  return (
    <Fragment>
      <Accordion>
        {collections.map((collection: any) => (
          <div className="custom-accordion-item">
            <Accordion.Item eventKey={collection.id}>
              <AccordionHeader key={collection.id} collection={collection} />

              <AccordionBody eventKey={collection.id} collection={collection} />
            </Accordion.Item>
          </div>
        ))}
      </Accordion>
    </Fragment>
  );
};

export default AccordionCollection;
