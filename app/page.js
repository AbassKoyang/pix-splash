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
  const [pagination, setPagination] = useState(3);
  const searchQuery = useSelector((state) => state.search.query)

  const fetchInitialImages = async () => {
    setLoading(true)
    const results = await fetchImages(searchQuery, pagination); // Change 'default_search_term' to the term you want to use.
    setImages(results);;
    setLoading(false)
  };

  useEffect(() => {
    fetchInitialImages();
  }, []);

  const handleSearch = async () => {
    setLoading(true)
    const results = await fetchImages(searchQuery, pagination);
    setImages(results);
    setLoading(false)
  };

  const handleIncrement = async () => {
      setPagination(4)
      setLoading(true)
      const results = await fetchImages(searchQuery, pagination);
      setImages(results);
      setLoading(false)
      console.log(pagination)
  }
 
  const handleDecrement =  () => {
    // Use the callback function of setPagination to ensure that pagination is updated first
    setPagination(prevPagination => {
      return prevPagination - 1; // Update pagination and return the new value
    });
  
    handleNextSearch();
  };

  const handleNextSearch = async () => {
    setLoading(true);
    const results = await fetchImages(searchQuery, pagination);
    console.log(pagination);
    setImages(results);
    setLoading(false);
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
    <main className="min-h-screen bg-white">
      <Navbar onSearch={handleSearch} otherStyles={`${navbar ? 'fixed top-0 flex' : 'hidden'}`} />
      <Hero onSearch={handleSearch} />
      <div className="grid relative grid-cols-4 mt-0 gap-8 bg-white p-3 lg:p-0">
      <Sidebar onSearch={handleSearch}/>
      <div className="bg-white col-span-4  lg:col-span-3 columns-2 md:columns-3 lg:columns-4 pt-4">
      {images.map((image) => (
        <Feed image={image} dataLoaded={loading} />
      ))}
      </div>
      </div>
      <div className="w-full p-3 bg-white flex items-center justify-between">
        <ShowMore title='Prev' iconStyles={`${pagination < 1 ? 'opacity-0' : 'opacity-1'} w-8 h-8 order-1 rotate-180`} handlePagination={handleDecrement}/>
        <ShowMore title='Next' iconStyles='w-8 h-8' handlePagination={handleIncrement}/>
      </div>
    </main>
  )
}
