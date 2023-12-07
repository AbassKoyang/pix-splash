import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='w-full flex flex-col md:flex-row gap-2 md:gap-0 md:justify-between md:items-center px-3 py-4 md:px-8 md:py-8'>
        <Link href='/' className="text-lg md:text-2xl font-bold text-black">PixSplash</Link>
        <p className='text-[12px] md:text-sm font-normal text-black'>Copyright: Pixsplash 2023.</p>

    </footer>
  )
}

export default Footer