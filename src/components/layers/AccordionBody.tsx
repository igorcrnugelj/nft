import React, {useEffect, Fragment, useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {updateLayers} from '../../store/actions/Layer-actions'
import Accordion from 'react-bootstrap/Accordion'
import AccordionBodyLayerItem from './AccordionBodyLayerItem'
import CreateNewLayer from './CreateNewLayer'
import {setMainPanelBodyDataType} from '../../store/actions/MainPanelActions'
import MainPanelDataType from '../../enums/MainPanelDataType'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'

const AccordionBody = (collection: any) => {
  const layers = useSelector((state: any) => state.layers.layers)
  const dispatch: any = useDispatch()

  useEffect(() => {
    //provjeriti je li layer order dobar
    let toUpdateLayersOrder = false
    if (layers) {
      let layersCopy = JSON.parse(JSON.stringify(layers)) //  Napravili smo DEEP SHALLOW!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! kopiju od "layers"!!!
      for (let i = 0; i < layersCopy.length; i++) {
        if (layersCopy[i].order !== i + 1) {
          layersCopy[i].order = i + 1
          toUpdateLayersOrder = true
        }
      }
      if (toUpdateLayersOrder) {
        dispatch(updateLayers(layersCopy))
      }
    }
  }, [layers])

  const showEditCollectionForm = () => {
    dispatch(
      setMainPanelBodyDataType({
        type: MainPanelDataType.EditForm,
      })
    )
  }

  // DRAG AND DROP
  const moveLayerListItem = useCallback(
    (dragIndex: any, replaceIndex: any) => {
      const dragItem = layers[dragIndex]
      const hoverItem = layers[replaceIndex]
      const layersCopy = [...layers]
      layersCopy[dragIndex] = {
        ...hoverItem,
        order: dragItem.order,
      }
      layersCopy[replaceIndex] = {
        ...dragItem,
        order: hoverItem.order,
      }
      dispatch(updateLayers(layersCopy))
    },
    [layers]
  )

  return (
    <Fragment>
      <Accordion.Body>
        <div className='col mt-0 ' style={{textAlign: 'end', marginBottom: 10}}>
          <button type='button' className='btn btn-success mr-2' onClick={showEditCollectionForm}>
            EDIT COLLECTION
          </button>
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
              />
            ))}
        </DndProvider>
      </Accordion.Body>
    </Fragment>
  )
}

export default AccordionBody
