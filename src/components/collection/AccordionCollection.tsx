import React, {Fragment, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Accordion} from 'react-bootstrap'
import AccordionHeader from './AccordionHeader'
import AccordionBody from '../layers/AccordionBody'
import {getCollections} from '../../store/actions/Collection-actions'

const AccordionCollection = () => {
  const dispatch: any = useDispatch()

  const collections = useSelector((state: any) => state.collectionsStore.collections)

  useEffect(() => {
    dispatch(getCollections())
  }, [])

  return (
    <Fragment>
      <Accordion>
        {collections.map((collection: any) => (
          <Accordion.Item eventKey={collection.collectionId}>
            <AccordionHeader key={collection.collectionId} collection={collection} />

            <AccordionBody eventKey={collection.collectionId} collection={collection} />
          </Accordion.Item>
        ))}
      </Accordion>
    </Fragment>
  )
}

export default AccordionCollection
