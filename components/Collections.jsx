import React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const Collections = () => {
  const [isFetchingCollections, setIsFetchingCollections] = useState(false);
  const [collections, setCollections] = useState([]);
  const {data: session} = useSession();


  const fetchCollections = async () => {
    setIsFetchingCollections(true)
    try {
      const response = await fetch(`api/users/${session?.user.id}/collections`);
      const collections = await response.json();
      setCollections(collections);
      console.log(collections);
    } catch (error) {
      console.log(error);
    }finally{
      setIsFetchingCollections(false)
    }
  };

    // if(session?.user.id){
    //   fetchCollections();
    // }
  

  return (
    <section className='w-full flex items-center justify-center px-6 lg:px-14'>
        <div className="w-full flex items-center justify-center gap-3 py-4 mt-5 border-b border-gray-300">
          <Link href='/profile' className="bg-[#f8f7f4] text-black px-4 py-2 rounded-full">Favourites</Link>
          <button  className="bg-black text-white px-4 py-2 rounded-full">Collections</button>
        </div>
        <section className="bg-white col-span-4 columns-1 md:columns-3 lg:columns-3 pt-4 overflow-x-hidden">
        {
                collections.map((collection) =>{
                  const {id, title, collectionDescription, content, createdAt} = collection;
                    const {urls, links, user, color, likes, description, created_at, updated_at, width, height} = content[0];
                  return (
                    <div key={id} className='p-5 md:p-8 w-full flex justify-between rounded-md border border-gray-700'>
                      <Image src={urls.small} width={100} height={100} />
                      <p>{title}</p>
                    </div>
                    )
                  })
              }
              <button onClick={fetchCollections}>nkhkhk</button>
        </section>
    </section>
  )
}

export default Collections