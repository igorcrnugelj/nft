import React, {Fragment, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import {setMainPanelBodyDataType, setMainPanelData} from '../../store/actions/MainPanelActions'
import MainPanelDataType from '../../enums/MainPanelDataType'
import {editImage, getLayerImages} from '../../store/actions/Layer-actions'

const EditImageForm = () => {
  const dispatch: any = useDispatch()
  const image = useSelector((state: any) => state.layers.image)
  const mainPanelData = useSelector((state: any) => state.mainPanelStore.mainPanelData)

  const [imageName, setImageName] = useState('')

  useEffect(() => {
    if (image) {
      setImageName(image.image.orginalName)
    }
  }, [image])

  const imageNameChangeHandler = (event: any) => {
    setImageName(event.target.value)
  }

  const saveImageChangesHandler = async () => {
    console.log('image: ', image)
    const imageEdited = {
      layerId: image.image.layerId,
      imageId: image.image.imageId,
      orginalName: imageName,
      s3Name: image.image.s3Name,
      url: image.image.url,
      order: image.image.order,
      contentType: image.image.contentType,
      imageRarity: image.image.imageRarity,
      fixedRarity: image.image.fixedRarity,
    }
    const editImageResponse = await dispatch(editImage(imageEdited)).unwrap()
    if (editImageResponse.success) {
      const getLayerImagesResponse = await dispatch(
        getLayerImages(mainPanelData.layerData.data.layerId)
      ).unwrap()
      if (getLayerImagesResponse.success) {
        dispatch(
          setMainPanelData({
            collectionData: mainPanelData.collectionData,
            layerData: {
              images: getLayerImagesResponse.data,
              data: mainPanelData.layerData.data,
            },
            type: MainPanelDataType.LayerImages,
          })
        )
      }
      dispatch(
        setMainPanelBodyDataType({
          type: MainPanelDataType.CancelEditImage,
        })
      )
    }
  }

  const cancelEditImageFormHandler = () => {
    dispatch(
      setMainPanelBodyDataType({
        type: MainPanelDataType.CancelEditImage,
      })
    )
  }

  return (
    <Fragment>
      <Form>
        <Form.Group controlId='formGroupEmail'>
          <Form.Label>Image name:</Form.Label>
          <Form.Control type='text' value={imageName} onChange={imageNameChangeHandler} />
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm={{span: 10, offset: 2}}>
            <Button type='reset' className='btn btn-success mr-2' onClick={saveImageChangesHandler}>
              Save Changes
            </Button>
            <Button
              type='reset'
              className='btn btn-success mr-2'
              onClick={cancelEditImageFormHandler}
            >
              CANCEL
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Fragment>
  )
}

export default EditImageForm
