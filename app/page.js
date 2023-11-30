"use client"
import Image from 'next/image';
import React from 'react';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import Feed from '@/components/Feed';
import { fetchImages } from '@/utils';
import Sidebar from '@/components/Sidebar';
import ShowMore from '@/components/ShowMore';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setImages } from '@/redux/imageSplice';

export default function Home() {
  const [navbar, setNavbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(1);
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.search.query);
  const router = useRouter();
  const images = useSelector((state) => state.imagelist.imagesarray);


  const fetchInitialImages = async () => {
    setLoading(true)
    const newImages = await fetchImages(searchQuery, pagination);
    if(newImages.length > 0){
      dispatch(setImages(newImages));
    } else {
      toast.error("Oops! No result.")
    }
    setLoading(false)
  };

  useEffect(() => {
    fetchInitialImages();
  }, [pagination]);


  const handleSearch = async () => {
    setLoading(true)
    const newImages = await fetchImages(searchQuery, pagination);
    if(newImages.length > 0){
      dispatch(setImages(newImages));
    } else {
      dispatch(setImages([]));
      toast.error("Oops! No result.");
    }
    setLoading(false)
  };

  const handleShowMore = () => {
      window.scroll({
    top: 100,
    behavior: "smooth"
    })
    setPagination((prevPage) => prevPage + 1);
  };
  const handleShowLess = () => {
      window.scroll({
    top: 100,
    behavior: "smooth"
    })
    setPagination((prevPage) => prevPage - 1);
  };
 

  useEffect(() => {
    function handleNavbar() {
      if (window.scrollY > 500) {
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
  }, [])
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Navbar onSearch={handleSearch} isSearchAllowed={true} otherStyles={`${navbar ? 'fixed top-0 flex' : 'hidden'}`} />
      <Hero onSearch={handleSearch} />
      <div className="grid grid-cols-4 mt-0 gap-8 bg-white p-3">
      <div className="bg-white col-span-4  columns-2 md:columns-3 lg:columns-5 pt-4 lg:px-6">
      {images.map((image) => (
        <Feed image={image} dataLoaded={loading} key={image.id} />
      ))}
      </div>
      </div>
      <div className={`w-full py-4 px-2 bg-white ${images.length < 1 ? 'hidden' : 'flex'} items-center justify-center gap-5`}>
      {pagination >= 2 && (
          <ShowMore title='Prev' handleShowMore={handleShowLess} />
        )
        }

        {pagination < 10 && (
          <ShowMore title='Next' handleShowMore={handleShowMore} />
        )
        }
      </div>
    </main>
  )
}
