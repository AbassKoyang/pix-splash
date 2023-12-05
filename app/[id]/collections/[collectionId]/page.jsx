"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { fetchImages } from '@/utils';
import { useSelector } from 'react-redux';
import Navbar from '@/components/Navbar';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { setImages } from '@/redux/imageSplice';
import { Content } from 'next/font/google';


const CollectionPage = () => {
const {data:session} = useSession();
const [pagination, setPagination] = useState(1);
const [navbar, setNavbar] = useState(false);
const [collection, setCollection] = useState([])
const searchQuery = useSelector((state) => state.search.query);
const router = useRouter();
const dispatch = useDispatch();
const pathName = usePathname();



const handleSearch = async () => {
  const newImages = await fetchImages(searchQuery, pagination);
  if(newImages.length > 0){
    dispatch(setImages(newImages));
    router.push('/')
  } else {
    toast.error("Oops! No result.")
  }
};

useEffect(() => {
  function handleNavbar() {
    if (window.scrollY > 100) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  };

  window.addEventListener('scroll', handleNavbar);
  handleNavbar();
  return () => {
    window.removeEventListener('scroll', handleNavbar);
  }
}, []);

const _id = pathName.toString().split().reverse().join().slice(0, 25);

useEffect(() => {
  const fetchCollections = async () => {
    try {
     const response = await fetch(`.../api/collections/${_id}`);
     const data = await response.json();
     setCollection(data);
    } catch (error) {
      console.log('error while trying to fethc collections', error)
    }
  }
  fetchCollections();
}, [])


// if (!session) {
//   router.push('/')
// };

  return (
    <main className='min-h-screen overflow-x-hidden'>
    <Navbar isSearchAllowed={true} otherStyles={`${navbar ? 'static' : 'static'}`} onSearch={handleSearch}/>
    { 
    collection && (
          <section className='w-full'>
          <div className="w-full flex items-center justify-between">
            <div className="flex flex-col gap-3">
              <h1 className='text-3xl font-extrabold text-[#0d0c22]'>{collection.title}</h1>
              <p className='text-[12px] text-gray-300'>{collection.content.length} shots</p>
              <p className='text-[14px] text-gray-300'>{collection.collectionDescription} </p>
            </div>
          </div>
        </section>
        )
    }
    </main>
  )
}

export default CollectionPage;