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
  const [truncatedEmail, setTruncatedEmail] = useState(null)


useEffect(() => {
  const fetchCollections = async () => {
    setIsFetchingCollections(true)
    try {
      const response = await fetch(`../api/users/${session?.user.id}/collections`);
      const collections = await response.json();
      setCollections(collections);
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

useEffect(() => {
  if(session){
    const truncateEmail = () => {
        const email = session?.user?.email || '' ;
        const truncatedEmail = email.toString().toLowerCase().replace('@gmail.com', '');
        setTruncatedEmail(truncatedEmail);
    }
    truncateEmail();
}
}, [session]);

  

  return (
    <section className='w-full px-6 lg:px-14'>
        <div className="w-full flex items-center justify-center gap-3 py-4 mt-5 border-b border-gray-300">
          <Link href={`/${truncatedEmail}`} className="bg-[#f8f7f4] text-black px-4 py-2 rounded-full">Favourites</Link>
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
                    const {content, title, _id} = collection;
                    return (
                      <Link href={`/${truncatedEmail}/collections/${_id}`} className='flex flex-col gap-3 mb-4 items-center group' key={_id}>
                         <div className="w-full flex flex-col h-[350px] rounded-lg bg-gray-300 overflow-hidden">
                            <div className="w-full h-[75%] object-cover">
                              <img
                              src={content[0].urls.small} alt={content[0].description}
                              className=''
                              />
                            </div>
                            <div className="w-full h-[25%] flex border-t-2 border-white">
                              {content[1] ? (
                                <div className='w-full h-full border-r-2 border-white object-contain'>
                                <img
                                  src={content[1].urls.full} alt={content[1].description}
                                  className=''
                                  />
                                </div>
                              ) : (
                                <div className='w-full h-full border-r-2 border-white bg-gray-300'></div>
                              )}

                              {content[2] ? (
                                <div className='w-full h-full border-white object-contain'>
                                <img
                                  src={content[2].urls.full} alt={content[2].description}
                                  className=''
                                  />
                                </div>
                              ) : (
                                <div className='w-full h-full border-white bg-gray-300'></div>
                              )}

                              {content[3] ? (
                                <div className='w-full h-full border-l-2 border-white object-contain'>
                                <img
                                  src={content[3].urls.full} alt={content[3].description}
                                  className=''
                                  />
                                </div>
                              ) : (
                                <div className='w-full h-full border-l-2 border-white bg-gray-300'></div>
                              )}
                            </div>
                        </div>
                        <div className='flex flex-col gap-1 items-center'>
                          <h1 className='text-[18px] text-black font-medium group-hover:underline'> {title} </h1>
                          <p className='text-sm text-gray-400'>{content.length} shots</p>
                        </div>
                      </Link>
                    );
                  })
                )
              }
        </section>
    </section>
  )
}

export default Collections