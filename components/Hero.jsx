"use client"
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import { pixsplashbg } from '@/public';
import { BiSearch } from 'react-icons/bi'
import { BsImages } from 'react-icons/bs'

const Hero = ({onSearch}) => {
const [searchQuery, setSearchQuery] = useState('');

const handleSearch = () => {
        onSearch(searchQuery);
  };
  return (

    <section className='w-full h-[500px] bg-contain' style={{ backgroundImage: "url(https://images.pexels.com/photos/18785909/pexels-photo-18785909.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500)" }}>
        <div className="w-full h-full absolute bg-black bg-opacity-60 z-0"/>
        <nav className={`w-full flex justify-between items-center px-4 py-8 lg:px-8 lg:py-5 bg-transparent z-10`}>
                <Link href='/' className="text-3xl font-extrabold text-white z-10">
                    PixSplash
                </Link>

            <button className='px-4 py-2 rounded-md bg-white text-black text-lg font-normal z-10'>Sign In</button>
        </nav>
        <div className="w-full mt-32 flex flex-col justify-center items-center z-10">
            <h1 className='max-w-4xl text-white text-center text-4xl lg:text-5xl font-extrabold mb-5 z-10'>The best free stock photos, royalty free images from Unsplash!</h1>
            <div className="w-full max-w-[20rem] md:max-w-xl flex justify-between items-center px-3 py-3 bg-white rounded-sm z-10">
                <BsImages className='w-5 h-5'/>
                <input type="text" placeholder="Search for photos..." className="w-[70%] h-full outline-none border-none stroke-none text-gray-700 bg-white" onChange={(e) =>{setSearchQuery(e.target.value)}}/>
                <button onClick={handleSearch}><BiSearch className='w-6 h-6 px-1 py-1 rounded-full bg-black text-white'/></button>
            </div>
        </div>
    </section>
  )
}

export default Hero