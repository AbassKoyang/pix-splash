import React from 'react'

const CollectionView = ({collection}) => {
    const {title, collectionDescription, content, authorName} = collection;
  return (
    <section className='w-full'>
          <div className="w-full flex items-center justify-between">
            <div className="flex flex-col gap-3">
              <h1 className='text-3xl font-extrabold text-[#0d0c22]'>{title}</h1>
              <p className='text-[12px] text-gray-300'> shots</p>
              <p className='text-[14px] text-gray-300'>{collectionDescription} </p>
              <h1 className='text-lg text-[#0d0c22] font-medium'>{authorName}</h1>
            </div>
          </div>
    </section>
  )
}

export default CollectionView