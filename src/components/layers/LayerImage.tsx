import React, {Fragment, useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/esm/Card'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css'
import RangeSlider from 'react-bootstrap-range-slider'
import {
  calculateRarityImages,
  deleteImage,
  getLayerImages,
  setImageData,
  setMaxRarityForCurrentImage,
  updateFixRarityImages,
} from '../../store/actions/Layer-actions'
import {setMainPanelBodyDataType, setMainPanelData} from '../../store/actions/MainPanelActions'
import MainPanelDataType from '../../enums/MainPanelDataType'

const LayerImage = (image: any) => {
  const dispatch: any = useDispatch()
  const [newRarityValue, setNewRarityValue] = useState(image.image.imageRarity)
  const [fixRarity, setFixRarity] = useState(false)
  const mainPanelData = useSelector((state: any) => state.mainPanelStore.mainPanelData)
  const maxRarityForCurrentImage = useSelector(
    (state: any) => state.layers.maxRarityForCurrentImage
  )

  useEffect(() => {
    setNewRarityValue(image.image.imageRarity)
  }, [image.image.imageRarity])

  useEffect(() => {
    if (image.image.fixedRarity === true) {
      console.log('image.image.fixedRarity: ', image.image.fixedRarity)
      setFixRarity(true)
    }
  }, [image.image.fixedRarity])

  const rangeHandler = async (event: any) => {
    setNewRarityValue(event.target.value)
    const imagesForCalculateRarityFunction = image.images
    const imageForCalculateRarityFunction = image.image
    console.log('rangeHandler')
    const calculateRarityImagesResponse = await dispatch(
      calculateRarityImages({
        newRarityValue,
        imagesForCalculateRarityFunction,
        imageForCalculateRarityFunction,
        fixRarity,
        maxRarityForCurrentImage,
      })
    ).unwrap()
    if (calculateRarityImagesResponse.success) {
      dispatch(setMaxRarityForCurrentImage(calculateRarityImagesResponse.maxRarity))
      dispatch(
        setMainPanelData({
          collectionData: mainPanelData.collectionData,
          layerData: {
            images: calculateRarityImagesResponse.data,
            data: mainPanelData.layerData.data,
          },
          type: MainPanelDataType.LayerImages,
        })
      )
    }
  }

  const rarityValueChange = (event: any) => {
    const rarityValue: any = event.target.value
    setNewRarityValue(rarityValue)
    // const imagesForCalculateRarityFunction = image.images.images.images
    // const imageForCalculateRarityFunction = image.image
    // console.log('rarityValueChange', image.image.orginalName + '  ' + rarityValue)
    // dispatch(
    //   calculateRarityImages({
    //     newRarityValue: rarityValue,
    //     imagesForCalculateRarityFunction,
    //     imageForCalculateRarityFunction,
    //     fixRarity,
    //     maxRarityForCurrentImage,
    //   })
    // )
  }

  const checkHandler = async (event: any) => {
    const imagesForCalculateRarityFunction = image.images
    const imageForCalculateRarityFunction = image.image
    const fixRarity = event.target.checked
    setFixRarity(event.target.checked)
    const updateFixRarityImagesResponse = await dispatch(
      updateFixRarityImages({
        imagesForCalculateRarityFunction,
        imageForCalculateRarityFunction,
        fixRarity,
      })
    ).unwrap()
    if (updateFixRarityImagesResponse.success) {
      dispatch(setMaxRarityForCurrentImage(updateFixRarityImagesResponse.maxRarity))
      dispatch(
        setMainPanelData({
          collectionData: mainPanelData.collectionData,
          layerData: {
            images: updateFixRarityImagesResponse.data,
            data: mainPanelData.layerData.data,
          },
          type: MainPanelDataType.LayerImages,
        })
      )
    }
  }

  const deleteImageHandler = async () => {
    const deleteImageData = {
      layerId: image.image.layerId,
      imageId: image.image.imageId,
    }
    const deleteImageResponse = await dispatch(deleteImage(deleteImageData)).unwrap()
    if (deleteImageResponse.success) {
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

  const editImageHandler = () => {
    dispatch(setImageData(image))
    dispatch(
      setMainPanelBodyDataType({
        type: MainPanelDataType.EditImage,
      })
    )
  }

  return (
    <Fragment>
      <Col xs={12} sm={4} md={4} lg={4}>
        <Card.Title>{image.image.orginalName}</Card.Title>
        <Card.Img className='square border' variant='top' src={image.image.url} />
        <Form>
          <Form.Check checked={fixRarity} label={`Fix Rarity:`} onChange={checkHandler} />

          <Form.Group as={Row}>
            <Col xs='4'>imageRarity:</Col>
            <Col xs='5'>
              <RangeSlider
                max={maxRarityForCurrentImage}
                value={newRarityValue}
                onChange={rarityValueChange}
                onAfterChange={rangeHandler}
                disabled={image.image.fixedRarity}
              />
            </Col>
            <Col xs='3'>
              {!fixRarity ? (
                <Form.Control value={newRarityValue} disabled />
              ) : (
                <Form.Control value={newRarityValue} />
              )}
            </Col>
          </Form.Group>
        </Form>
        <Button variant='primary' onClick={deleteImageHandler}>
          Delete
        </Button>
        <Button variant='primary' onClick={editImageHandler}>
          Edit
        </Button>
      </Col>
    </Fragment>
  )
}

export default LayerImage
