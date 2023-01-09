import React, {Fragment, useEffect} from 'react'
import CollectionDataForMainPanel from './CollectionDataForMainPanel'
import CollectionPreviewImage from './CollectionPreviewImage'
import DeleteCollection from './DeleteCollection'
import DownloadCollection from './DownloadCollection'
import GenerateCollection from './GenerateCollection'
import GeneratePreviewImages from './GeneratePreviewImages'

const CollectionPreview = (collection: any) => {
  return (
    <Fragment>
      <div className='col mt-0 ' style={{textAlign: 'end'}}>
        <DownloadCollection />
        <GenerateCollection key={collection.collectionId} collection={collection} />
        <GeneratePreviewImages key={collection.collectionId} collection={collection} />
        <DeleteCollection />
      </div>
      <CollectionDataForMainPanel collection={collection} />
      {collection.collection.collection.previewImages?.map((previewImage: any) => (
        <CollectionPreviewImage key={previewImage.previewImageId} previewImage={previewImage} />
      ))}
    </Fragment>
  )
}

export default CollectionPreview
