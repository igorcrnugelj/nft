import React, {Fragment, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import MainPanelDataType from '../../enums/MainPanelDataType'
import {setMainPanelBodyDataType, setMainPanelData} from '../../store/actions/MainPanelActions'
import {activateToast} from '../../store/actions/Notifications-actions'
import Messages from '../../enums/Messages'
import {editLayer, getLayers} from '../../store/actions/Layer-actions'

const EditLayerForm = () => {
  const dispatch: any = useDispatch()
  const mainPanelData = useSelector((state: any) => state.mainPanelStore.mainPanelData)

  const [layerName, setLayerName] = useState('')
  const [layerDescription, setLayerDescription] = useState('')
  const [layerRarity, setLayerRarity] = useState('')

  useEffect(() => {
    if (mainPanelData.layerData.data) {
      setLayerName(mainPanelData.layerData.data.name)
      setLayerDescription(mainPanelData.layerData.data.description)
      setLayerRarity(mainPanelData.layerData.data.layerRarity)
    }
  }, [mainPanelData.layerData.data])

  const layerNameChangeHandler = (event: any) => {
    setLayerName(event.target.value)
  }
  const layerDescriptionChangeHandler = (event: any) => {
    setLayerDescription(event.target.value)
  }
  const layerRarityChangeHandler = (event: any) => {
    console.log(typeof event.target.value)
    setLayerRarity(event.target.value)
  }

  const saveLayerChangesHandler = async () => {
    const layer = {
      collectionId: mainPanelData.layerData.data.collectionId,
      layerId: mainPanelData.layerData.data.layerId,
      name: layerName,
      description: layerDescription,
      order: mainPanelData.layerData.data.order,
      layerRarity: parseInt(layerRarity),
    }
    const payload = await dispatch(editLayer(layer)).unwrap()
    if (payload.success) {
      dispatch(getLayers(mainPanelData.layerData.data.collectionId))
      dispatch(
        setMainPanelData({
          collectionData: mainPanelData.collectionData,
          layerData: {
            images: mainPanelData.layerData.images,
            data: layer,
          },
          type: MainPanelDataType.LayerImages,
        })
      )
      dispatch(activateToast(Messages.LayerEditedSuccessfully))
      dispatch(
        setMainPanelBodyDataType({
          type: MainPanelDataType.LayerImages,
        })
      )
    } else {
      dispatch(activateToast(Messages.EditCollectionFailed))
    }
  }
  const showLayerDetailsHandler = () => {
    dispatch(
      setMainPanelBodyDataType({
        type: MainPanelDataType.LayerImages,
      })
    )
  }

  return (
    <Fragment>
      <Form>
        <Form.Group controlId='formGroupEmail'>
          <Form.Label>Layer name:</Form.Label>
          <Form.Control type='text' value={layerName} onChange={layerNameChangeHandler} />
        </Form.Group>
        <Form.Group controlId='formGroupPassword'>
          <Form.Label>Layer description:</Form.Label>
          <Form.Control
            type='text'
            value={layerDescription}
            onChange={layerDescriptionChangeHandler}
          />
        </Form.Group>
        <Form.Group controlId='formGroupPassword'>
          <Form.Label>Layer rarity:</Form.Label>
          <Form.Control type='number' value={layerRarity} onChange={layerRarityChangeHandler} />
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm={{span: 10, offset: 2}}>
            <Button type='reset' className='btn btn-success mr-2' onClick={saveLayerChangesHandler}>
              Save Changes
            </Button>
            <Button type='reset' className='btn btn-success mr-2' onClick={showLayerDetailsHandler}>
              CANCEL
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Fragment>
  )
}

export default EditLayerForm
