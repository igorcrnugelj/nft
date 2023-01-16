import React, { Fragment, useRef } from "react";
import { useDispatch } from "react-redux";
import MainPanelDataType from "../../enums/MainPanelDataType";
import Messages from "../../enums/Messages";
import {
  getLayers,
  deleteLayer,
  getLayerImages,
} from "../../store/actions/Layer-actions";
import {
  setMainPanelBodyDataType,
  setMainPanelData,
} from "../../store/actions/MainPanelActions";
import { activateToast } from "../../store/actions/Notifications-actions";
import { useDrag, useDrop } from "react-dnd";
import "../../css/form/style.css";
import { Button } from "bootstrap";

const AccordionBodyLayerItem = ({
  layer,
  collection,
  index,
  moveListItem,
}: any) => {
  const dispatch: any = useDispatch();

  const deleteLayerHandler = async () => {
    const { collectionId, layerId } = layer;
    const payload = await dispatch(
      deleteLayer({ collectionId, layerId })
    ).unwrap();
    if (payload.success) {
      dispatch(activateToast(Messages.LayerDeletedSuccessfully));
      dispatch(getLayers(collectionId));
      dispatch(
        setMainPanelData({
          collectionData: collection,
          layerData: null,
          type: MainPanelDataType.CollectionPreview,
        })
      );
      dispatch(
        setMainPanelBodyDataType({
          type: MainPanelDataType.DeleteLayer,
        })
      );
    } else {
      dispatch(activateToast(Messages.DeleteLayerFailed));
    }
  };

  //DRAG AND DROP
  // useDrag - the list item is draggable
  const [{ isDragging }, dragRef] = useDrag({
    type: "item",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.didDrop(),
    }),
  });
  // useDrop - the list item is also a drop area
  const [spec, dropRef] = useDrop({
    accept: "item",
    drop: (item: any) => {
      moveListItem(item.index, index);
    },
  });
  // Join the 2 refs together into one (both draggable and can be dropped on)
  const ref = useRef<any>(null);
  const dragDropRef: any = dragRef(dropRef(ref));
  //DRAG AND DROP END

  const getLayerImagesHandler = async () => {
    const getLayerImagesResponse = await dispatch(
      getLayerImages(layer.layerId)
    ).unwrap();
    if (getLayerImagesResponse.success) {
      dispatch(
        setMainPanelData({
          collectionData: collection,
          layerData: {
            images: getLayerImagesResponse.data,
            data: layer,
          },
          type: MainPanelDataType.LayerImages,
        })
      );
    }
    dispatch(
      setMainPanelBodyDataType({
        type: MainPanelDataType.LayerImages,
      })
    );
  };
  const showEditLayerFormHandler = () => {
    dispatch(
      setMainPanelBodyDataType({
        type: MainPanelDataType.ShowLayerEditForm,
      })
    );
  };

  return (
    <Fragment>
      <div className="table-responsive">
        <div
          ref={dragDropRef}
          style={{ border: isDragging ? "5px solid pink" : "0px" }}
          className="accordion-body-container"
        >
          <div className="layer-img-name-container">
            {/* <i className="bi bi-stack layer-bi-stack-color"></i> */}
            <i className="bi bi-arrows-move layer-bi-arrows-move-color"></i>
            <button
              className="accordion-body-layer-name"
              onClick={getLayerImagesHandler}
            >
              {" "}
              {layer.name}
            </button>
            <div>{layer.order}</div>
          </div>
          <div className="layer-edit-trash-container">
            <i
              onClick={showEditLayerFormHandler}
              className="bi bi-pencil-fill layer-bi-pencil-color"
            ></i>
            <i
              onClick={deleteLayerHandler}
              className="bi bi-trash-fill layer-bi-trash-color"
            ></i>
          </div>
        </div>
      </div>
      {/* *********************************************************** */}
      {/* <div className="table-responsive">
        <tbody>
          <div
            ref={dragDropRef}
            style={{ border: isDragging ? "5px solid pink" : "0px" }}
          >
            <tr>
              <td>
                <span className="svg-icon svg-icon-warning me-5">
                  <span className="svg-icon svg-icon-1">
                    <i className="bi bi-stack"></i>
                  </span>
                </span>
              </td>
              <td className="mb-10" onClick={getLayerImagesHandler}>
                {layer.name}
              </td>
              <td> " "</td>
              <td className="mb-10">{layer.order}</td>
              <td>
                <div className="d-flex justify-content-end flex-shrink-0">
                  <a
                    href="#"
                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    onClick={showEditLayerFormHandler}
                  >
                    <span className="svg-icon svg-icon-1">
                      <i className="bi bi-pencil-fill"></i>
                    </span>
                  </a>
                  <a
                    href="#"
                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                    onClick={deleteLayerHandler}
                  >
                    <span className="svg-icon svg-icon-1">
                      <i className="bi bi-trash-fill"></i>
                    </span>
                  </a>
                </div>
              </td>
            </tr>
          </div>
        </tbody>
      </div> */}
    </Fragment>
  );
};

export default AccordionBodyLayerItem;
