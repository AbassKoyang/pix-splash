"use client"
import Image from 'next/image';
import React from 'react';
import Navbar from '@/components/Navbar';
import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import Feed from '@/components/Feed';
import { fetchImages } from '@/utils';
import Sidebar from '@/components/Sidebar';
import ShowMore from '@/components/ShowMore';
import { useSelector } from 'react-redux';

export default function Home() {
  const [images, setImages] = useState([]);
  const [navbar, setNavbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(1);
  const searchQuery = useSelector((state) => state.search.query)
  const [imagesCheck, setImagesCheck] = useState(false)

  const fetchInitialImages = async () => {
    setLoading(true)
    const newImages = await fetchImages(searchQuery, pagination);
    setImages(newImages);
    setLoading(false)
  };

  useEffect(() => {
    fetchInitialImages();
  }, [pagination]);


  const handleSearch = async () => {
    const newImages = await fetchImages(searchQuery, pagination);
    setImages(newImages);
    setLoading(false)
  };

  const handleShowMore = () => {
    setPagination((prevPage) => prevPage + 1);
    console.log(pagination);
    console.log(searchQuery)
  };
  const handleShowLess = () => {
    setPagination((prevPage) => prevPage - 1);
    console.log(pagination);
    console.log(searchQuery)
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
      <Navbar onSearch={handleSearch} otherStyles={`${navbar ? 'fixed top-0 flex' : 'hidden'}`} />
      <Hero onSearch={handleSearch} />
      <div className="grid grid-cols-4 mt-0 gap-8 bg-white p-3">
      <div className="bg-white col-span-4  columns-2 md:columns-3 lg:columns-4 pt-4">
      {images.map((image) => (
        <Feed image={image} dataLoaded={loading} />
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
