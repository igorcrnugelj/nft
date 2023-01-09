import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Form from 'react-bootstrap/Form'
import {addNewImage, getLayerImages} from '../../store/actions/Layer-actions'
import MainPanelDataType from '../../enums/MainPanelDataType'
import {setMainPanelData} from '../../store/actions/MainPanelActions'

const AddNewImage = () => {
  const mainPanelData = useSelector((state: any) => state.mainPanelStore.mainPanelData)
  const dispatch: any = useDispatch()

  async function imageSize(imageUrl: any) {
    let img = new Image()
    img.src = window.URL.createObjectURL(imageUrl)
    const promise = new Promise((resolve, reject) => {
      img.onload = () => {
        const width = img.width
        const height = img.height
        resolve({width, height})
      }
    })
    return promise
  }
  const fileSelectedHandler = async (event: any) => {
    const images = mainPanelData.layerData.images
    const imageUrl = event.target.files[0]
    const imageDimensions: any = await imageSize(imageUrl)
    let layerOrder = 1
    let max: any = 0
    if (images.length > 0) {
      max = images.reduce((prev: any, current: any) =>
        prev.order > current.order ? prev : current
      )
      layerOrder = parseInt(max.order + 1)
    }
    // setShowSpinnerModal(true)
    const imageData = {
      collectionId: mainPanelData.layerData.data.collectionId,
      layerId: mainPanelData.layerData.data.layerId,
      contentType: event.target.files[0].type,
      orginalName: event.target.files[0].name,
      order: layerOrder,
      width: imageDimensions.width,
      height: imageDimensions.height,
    }
    const imageFileData = event.target.files[0]
    const imageDataCollection = {
      imageData,
      imageFileData,
    }
    const addNewImageResponse = await dispatch(addNewImage(imageDataCollection)).unwrap()
    if (addNewImageResponse.success) {
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
    }
  }

  return (
    <Form.Group controlId='formFile' className='mb-3'>
      <Form.Label>Add new image:</Form.Label>
      <Form.Control type='file' onChange={fileSelectedHandler} />
    </Form.Group>
  )
}

export default AddNewImage
