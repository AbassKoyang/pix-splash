"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { fetchImages } from '@/utils';
import { useSelector } from 'react-redux';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ProfileInfo from '@/components/ProfileInfo';
import { useDispatch } from 'react-redux';
import { setImages, selectImages } from '@/redux/imageSplice';
import Favourites from '@/components/Favourites';

const Profilepage = () => {
const {data:session} = useSession();
const [pagination, setPagination] = useState(1);
const [navbar, setNavbar] = useState(false);
const searchQuery = useSelector((state) => state.search.query);
const router = useRouter();
const dispatch = useDispatch();



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

// if (!session) {
//   router.push('/')
// };

  return (
    <main className='min-h-screen overflow-x-hidden'>
    <Navbar isSearchAllowed={true} otherStyles={`${navbar ? 'static' : 'static'}`} onSearch={handleSearch}/>
    <ProfileInfo />
    <Favourites/>
    </main>
  )
}

export default Profilepage;