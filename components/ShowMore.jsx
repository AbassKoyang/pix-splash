import React from 'react'
import { BiChevronRight } from 'react-icons/bi';

const ShowMore = ({title, iconStyles, handleShowMore}) => {
  return (
    <button className='flex items-center justify-center px-4 py-2 rounded-md bg-black text-white text-sm font-medium lg:text-lg' onClick={handleShowMore}>
      {title}
    </button>
  )
}

export default ShowMore