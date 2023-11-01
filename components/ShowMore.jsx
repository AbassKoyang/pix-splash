import React from 'react'
import { BiChevronRight } from 'react-icons/bi'

const ShowMore = ({title, iconStyles, handlePagination}) => {
  return (
    <button className='flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-black text-white' onClick={handlePagination}>
      {title}
      <BiChevronRight className={iconStyles} />
    </button>
  )
}

export default ShowMore