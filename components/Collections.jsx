import React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Collections = () => {
  const [isFetchingCollections, setIsFetchingCollections] = useState(false);
  const [collections, setCollections] = useState([]);
  const {data: session} = useSession();


useEffect(() => {
  const fetchCollections = async () => {
    setIsFetchingCollections(true)
    try {
      const response = await fetch(`http://localhost:3000/api/users/${session?.user.id}/collections`);
      const collections = await response.json();
      setCollections(collections);
      console.log(collections);
    } catch (error) {
      console.log(error);
    }finally{
      setIsFetchingCollections(false)
    }
  };

    if(session?.user.id){
      fetchCollections();
    }
}, [])

  

  return (
    <section className='w-full px-6 lg:px-14'>
        <div className="w-full flex items-center justify-center gap-3 py-4 mt-5 border-b border-gray-300">
          <Link href='/profile' className="bg-[#f8f7f4] text-black px-4 py-2 rounded-full">Favourites</Link>
          <button  className="bg-black text-white px-4 py-2 rounded-full">Collections</button>
        </div>
        <section className={`bg-white w-full ${isFetchingCollections ? 'flex justify-center items-center overflow-y-hidden' : 'col-span-4 columns-1 md:columns-3 lg:columns-3'} pt-4 px-6 lg:px-14 overflow-x-hidden`}>
              {
                isFetchingCollections? (
                  <div className='flex items-center gap-1'>
                  <p className='text-[15px] text-[#0d0c22] font-semibold'>Loading collections...</p> <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin"/>
                  </div>
                ) : (
                  collections.map((collection) => {
                    const {content} = collection;
                    return (
                      <div className="w-full flex flex-col gap-1 h-[380px] rounded-lg bg-gray-300 overflow-hidden mb-4" key={collection.title}>
                        <div className="w-full h-[70%]">
                          <img
                          src={content[0].urls.small} alt={content[0].description}
                          className='w-full h-full'
                          />
                        </div>
                        <div className="w-full h-[30%] flex gap-1">
                        <img
                          src={content[0].urls.small} alt={content[0].description}
                          className='w-full h-full'
                          />
                        <img
                          src={content[0].urls.small} alt={content[0].description}
                          className='w-full h-full'
                          />
                        <img
                          src={content[0].urls.small} alt={content[0].description}
                          className='w-full h-full'
                          />
                        </div>
                      </div>
                    );
                  })
                )
              }
        </section>
    </section>
  )
}

export default Collections