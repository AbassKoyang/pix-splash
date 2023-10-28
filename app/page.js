"use client"
import Image from 'next/image';
import React from 'react';
import Navbar from '@/components/Navbar';
import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import Feed from '@/components/Feed';
import { fetchImages } from '@/utils';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  const [images, setImages] = useState([]);
  const [navbar, setNavbar] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchInitialImages = async () => {
    setLoading(true)
    const results = await fetchImages('nature'); // Change 'default_search_term' to the term you want to use.
    setImages(results);
    console.log(results);
    setLoading(false)
  };

  useEffect(() => {
    fetchInitialImages();
  }, []);

  const handleSearch = async (query) => {
    setLoading(true)
    const results = await fetchImages(query);
    setImages(results);
    setLoading(false)
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
    </main>
  )
}
