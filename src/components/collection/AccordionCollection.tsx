import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import AccordionHeader from "./AccordionHeader";
import AccordionBody from "../layers/AccordionBody";
import { getCollections } from "../../store/actions/Collection-actions";
import "../../css/accordion/accordion-header.scss";

const AccordionCollection = () => {
  const dispatch: any = useDispatch();

  const collections = useSelector(
    (state: any) => state.collectionsStore.collections
  );

  useEffect(() => {
    dispatch(getCollections());
  }, []);

  return (
    <Fragment>
      <Accordion>
        {collections.map((collection: any) => (
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
