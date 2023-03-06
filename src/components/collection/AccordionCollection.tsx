import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import AccordionHeader from "./AccordionHeader";
import AccordionBody from "../layers/AccordionBody";
import { getCollections } from "../../store/actions/Collection-actions";
import "../../css/accordion/accordion-header.scss";
import { setUser } from "../../store/actions/LoginActions";
import { setNftClientToken } from "../../AxiosClient";
import { setMainPanelBodyDataType } from "../../store/actions/MainPanelActions";
import MainPanelDataType from "../../enums/MainPanelDataType";

const AccordionCollection = () => {
  const dispatch: any = useDispatch();

  const collections = useSelector(
    (state: any) => state.collectionsStore.collections
  );
  // const user = useSelector((state: any) => state.loginStore.user);

  // useEffect(() => {
  //   const userString = localStorage.getItem("user");
  //   if (userString) {
  //     const user = JSON.parse(userString);
  //     dispatch(setUser(user));
  //   } else {
  //     dispatch(
  //       setMainPanelBodyDataType({
  //         type: MainPanelDataType.ShowLoginForm,
  //       })
  //     );
  //   }
  // }, []);

  // useEffect(() => {
  //   if (user) {
  //     dispatch(getCollections());
  //   }
  // }, [user]);

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
