import React from 'react';
import Link from 'next/link';

const Collections = () => {
  return (
    <section className='w-full flex items-center justify-center px-6 lg:px-14'>
        <div className="w-full flex items-center justify-center gap-3 py-4 mt-5 border-b border-gray-300">
          <Link href='/profile' className="bg-[#f8f7f4] text-black px-4 py-2 rounded-full">Favourites</Link>
          <button  className="bg-black text-white px-4 py-2 rounded-full">Collections</button>
        </div>
    </section>
  )
}

export default Collections