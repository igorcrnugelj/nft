import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import AccordionHeader from "./AccordionHeader";
import AccordionBody from "../layers/AccordionBody";
import "../../css/accordion/accordion-header.scss";

const AccordionCollection = () => {
  const collections = useSelector(
    (state) => state.collectionsStore.collections
  );

  return (
    <Fragment>
      <Accordion>
        {collections.map((collection) => (
          <div className="custom-accordion-item">
            <Accordion.Item eventKey={collection.collectionId}>
              <AccordionHeader
                key={collection.collectionId}
                collection={collection}
              />

              <AccordionBody
                eventKey={collection.collectionId}
                collection={collection}
              />
            </Accordion.Item>
          </div>
        ))}
      </Accordion>
    </Fragment>
  );
};

export default AccordionCollection;
