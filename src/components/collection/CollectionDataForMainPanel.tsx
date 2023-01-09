import React, {Fragment, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import {editCollection, getCollections} from '../../store/actions/Collection-actions'
import MainPanelDataType from '../../enums/MainPanelDataType'
import DeleteCollectionCard from './DeleteCollectionCard'
import Messages from '../../enums/Messages'
import {activateToast} from '../../store/actions/Notifications-actions'
import {setMainPanelBodyDataType, setMainPanelData} from '../../store/actions/MainPanelActions'

const CollectionDataForMainPanel = (collection: any) => {
  const dispatch: any = useDispatch()
  const mainPanelData = useSelector((state: any) => state.mainPanelStore.mainPanelData)
  const mainPanelBodyDataType = useSelector(
    (state: any) => state.mainPanelStore.mainPanelBodyDataType
  )
  const [collectionName, setCollectionName] = useState('')
  const [collectionDescription, setCollectionDescription] = useState('')
  const [collectionSize, setCollectionSize] = useState('')

  useEffect(() => {}, [mainPanelBodyDataType])

  useEffect(() => {
    if (mainPanelData) {
      setCollectionName(mainPanelData.collectionData.collection.name)
      setCollectionDescription(mainPanelData.collectionData.collection.description)
      setCollectionSize(mainPanelData.collectionData.collection.collectionSize)
    }
  }, [mainPanelData])
  const nameChangeHandler = (event: any) => {
    setCollectionName(event.target.value)
  }
  const descriptionChangeHandler = (event: any) => {
    setCollectionDescription(event.target.value)
  }
  const sizeChangeHandler = (event: any) => {
    setCollectionSize(event.target.value)
  }
  const editCollectionHandler = async () => {
    const collection = {
      userId: mainPanelData.collectionData.collection.userId,
      collectionId: mainPanelData.collectionData.collection.collectionId,
      name: collectionName,
      description: collectionDescription,
      collectionSize: parseInt(collectionSize),
    }
    const payload = await dispatch(editCollection(collection)).unwrap()
    if (payload.success) {
      const mainPanelDataEdited = {...mainPanelData, collectionData: {collection: payload.data}}
      dispatch(setMainPanelData(mainPanelDataEdited))
      dispatch(
        setMainPanelBodyDataType({
          type: MainPanelDataType.ShowCollectionDetails,
        })
      )
      dispatch(getCollections())
    } else {
      dispatch(activateToast(Messages.EditCollectionFailed))
    }
  }

  const showEditCollectionForm = () => {
    dispatch(
      setMainPanelBodyDataType({
        type: MainPanelDataType.EditForm,
      })
    )
  }

  const showCollectionDetailsHandler = () => {
    dispatch(
      setMainPanelBodyDataType({
        type: MainPanelDataType.ShowCollectionDetails,
      })
    )
  }

  return (
    <Fragment>
      {mainPanelBodyDataType.type !== MainPanelDataType.EditForm &&
        mainPanelBodyDataType.type !== MainPanelDataType.DeleteCollection && (
          <Card style={{width: '100%', marginBottom: '20px', border: 0}}>
            <Card.Body>
              <Card.Title className='mb-5'>
                {collection.collection.collection.collection.name}
              </Card.Title>
              <Card.Subtitle className='mb-2'>Description:</Card.Subtitle>
              <Card.Text>{collection.collection.collection.collection.description}</Card.Text>
              <Card.Subtitle className='mb-2'>Number of collectios to generate: </Card.Subtitle>
              <Card.Text>{collection.collection.collection.collection.collectionSize}</Card.Text>
            </Card.Body>

            <div className='col mt-0 ' style={{textAlign: 'start', marginLeft: 30}}>
              <button
                type='button'
                className='btn btn-success mr-2'
                onClick={showEditCollectionForm}
              >
                EDIT COLLECTION
              </button>
            </div>
          </Card>
        )}

      {mainPanelBodyDataType.type === MainPanelDataType.EditForm && (
        <Form>
          <Form.Group controlId='formGroupEmail'>
            <Form.Label>Collection name:</Form.Label>
            <Form.Control type='text' value={collectionName} onChange={nameChangeHandler} />
          </Form.Group>
          <Form.Group controlId='formGroupPassword'>
            <Form.Label>Collection description:</Form.Label>
            <Form.Control
              type='text'
              value={collectionDescription}
              onChange={descriptionChangeHandler}
            />
          </Form.Group>
          <Form.Group controlId='formGroupPassword'>
            <Form.Label>Number of collections to generate:</Form.Label>
            <Form.Control type='number' value={collectionSize} onChange={sizeChangeHandler} />
          </Form.Group>
          <Form.Group as={Row}>
            <Col sm={{span: 10, offset: 2}}>
              <Button type='reset' className='btn btn-success mr-2' onClick={editCollectionHandler}>
                Save Changes
              </Button>

              <Button
                type='reset'
                className='btn btn-success mr-2'
                onClick={showCollectionDetailsHandler}
              >
                CANCEL
              </Button>
            </Col>
          </Form.Group>
        </Form>
      )}

      {mainPanelBodyDataType.type === MainPanelDataType.DeleteCollection && (
        <DeleteCollectionCard collection={collection} />
      )}

      {mainPanelBodyDataType.type === MainPanelDataType.Deleted && <></>}
    </Fragment>
  )
}

export default CollectionDataForMainPanel
