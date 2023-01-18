import React, { useEffect, Fragment, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLayers } from "../../store/actions/Layer-actions";
import Accordion from "react-bootstrap/Accordion";
import AccordionBodyLayerItem from "./AccordionBodyLayerItem";
import CreateNewLayer from "./CreateNewLayer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const AccordionBody = (collection: any) => {
  const layers = useSelector((state: any) => state.layers.layers);

  const dispatch: any = useDispatch();
  const [idOfActiveItem, setIdOfActiveItem] = useState();

  useEffect(() => {
    //provjeriti je li layer order dobar
    let toUpdateLayersOrder = false;
    if (layers) {
      let layersCopy = JSON.parse(JSON.stringify(layers)); //  Napravili smo DEEP SHALLOW!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! kopiju od "layers"!!!
      for (let i = 0; i < layersCopy.length; i++) {
        if (layersCopy[i].order !== i + 1) {
          layersCopy[i].order = i + 1;
          toUpdateLayersOrder = true;
        }
      }
      if (toUpdateLayersOrder) {
        dispatch(updateLayers(layersCopy));
      }
    }
  }, [layers]);

  // DRAG AND DROP
  const moveLayerListItem = useCallback(
    (dragIndex: any, replaceIndex: any) => {
      const dragItem = layers[dragIndex];
      const hoverItem = layers[replaceIndex];
      const layersCopy = [...layers];
      layersCopy[dragIndex] = {
        ...hoverItem,
        order: dragItem.order,
      };
      layersCopy[replaceIndex] = {
        ...dragItem,
        order: hoverItem.order,
      };
      dispatch(updateLayers(layersCopy));
    },
    [layers]
  );

  const findActiveItemHandler = (itemId: any) => {
    setIdOfActiveItem(itemId);
  };

  return (
    <Fragment>
      <Accordion.Body>
        <div
          className="create-new-layer-container"
          style={{ textAlign: "end", marginBottom: 10 }}
        >
          <CreateNewLayer />
        </div>
        <DndProvider backend={HTML5Backend}>
          {layers &&
            layers.map((layer: any, index: any) => (
              <AccordionBodyLayerItem
                key={layer.layerId}
                index={index}
                layer={layer}
                collection={collection}
                moveListItem={moveLayerListItem}
                whichItemIsActive={findActiveItemHandler}
                isActive={layer.layerId === idOfActiveItem ? true : false}
              />
            ))}
        </DndProvider>
      </Accordion.Body>
    </Fragment>
  );
};

export default AccordionBody;
