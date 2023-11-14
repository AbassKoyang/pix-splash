"use client";
import React , {useState, useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BiSearch } from 'react-icons/bi';
import { BsImages, BsMenuButton } from 'react-icons/bs';
import { FiMenu, FiX } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@/redux/searchSplice';
import {motion, useAnimation } from 'framer-motion';
import { useSession, signIn, signOut, getProviders, SessionProvider } from "next-auth/react";

const Navbar = ({otherStyles, onSearch }) => {
const { data: session } = useSession() ;
const [provider, setProvider] = useState(null)
const [filled, setFilled] = useState(false)
const dispatch = useDispatch();
const query = useSelector((state) => state.search.query);
const [menuToggle, setMenuToggle] = useState(false)
// State to toggle animation
const [isAnimating, setIsAnimating] = useState(false);

useEffect(()=>{
    const setUpProviders = async () =>{
        const response = await getProviders();
        setProvider(response);
    }
    setUpProviders();
},[]);

const handlePress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSearch();
          }
}
const handleQueryChange = (e) => {
    const value = e.target.value;
    dispatch(setSearchQuery(value))
    console.log(value);
    console.log(query)
}
const handleSearch = () => {
        if(query === '') {
            alert("Input field cannot be empty")
        }else {
            setFilled(false)
            onSearch(query);
        }
  };

      // Framer Motion controls
      const controls = useAnimation();
    
      // Function to handle the button click
      const handleClick = async () => {
        setIsAnimating(true);
        await controls.start({ x: 0, opacity: 1 });
      };


  return (
    <nav className={`w-full justify-between items-center px-3 py-4 lg:px-8 lg:py-5 ${otherStyles} bg-white z-20`}>
        <div className="w-full max-w-[90%] md:justify-between md:max-w-[80%] lg:max-w-[60%] flex items-center gap-5 lg:gap-14">
            <Link href='/' className="text-2xl font-bold text-black hidden lg:block">
                PixSplash
            </Link>
            <Link href='/' className="text-2xl font-bold text-black block lg:hidden">
                PS
            </Link>

            <div className="w-full max-w-[22rem] md:max-w-2xl flex justify-between items-center p-2 pl-3 lg:p-3 bg-gray-200 lg:bg-gray-300 rounded-full lg:rounded-lg">
                <BsImages className='w-5 h-5 hidden md:block'/>
                <input type="text" placeholder="Search for photos..." required className="w-[70%] h-full outline-none border-none stroke-none text-gray-700 text-sm md:text-lg bg-transparent" value={query} onKeyDown={handlePress} onChange={(e) => {handleQueryChange(e)}}/>
                <button onClick={handleSearch}><BiSearch className='w-6 h-6 px-1 py-1 rounded-full bg-black text-white'/></button>
            </div>
        </div>


        {session?.user ? (

                <Image src={session.user.image} alt='Profile Image' width={50} height={50} className='object-contain rounded-full'/>

            ) : (

                   <>
                    { provider &&

                        Object.values(provider).map((providerTwo) =>(
                            <button 
                            type="button"
                            key={providerTwo.name}
                            onClick={() => signIn(providerTwo.id)}
                            className='px-4 py-3 rounded-md bg-black text-white text-lg font-normal hidden lg:block'
                            >
                            Sign In
                            </button>
                        ))       
                }
                   </>

            )}
            
            {/* Mobile toggle button */}
        
        {session?.user ? (
                    <button className='relative block lg:hidden transition-all duration-300' onClick={() => {setMenuToggle(!menuToggle), handleClick}}>
                    {!menuToggle ? (<FiMenu className='w-8 h-8 transition-all duration-300'/>) : (<FiX className='w-8 h-8 transition-all duration-300'/>)}
                    {menuToggle && (
                        <motion.div
                        initial={{ x: '100%', opacity: 0 }}
                        animate={isAnimating ? controls : { x: '0', opacity: 1 }}
                        transition={{ duration: 0.7 }}
                        className="w-[170px] absolute flex flex-col gap-3 items-center justify-center top-14 right-1 bg-white shadow-lg p-5 rounded-md"
                    >
                        <Link href='/' className='text-gray-700 font-normal text-sm'>Profile</Link>
                        <Link href='/' className='text-gray-700 font-normal text-sm'>Favourites</Link>
                        <Link href='/' className='text-gray-700 font-normal text-sm'>Saved</Link>
                    </motion.div>
                    )}
                </button>
        ) : (
            <button className='relative block lg:hidden transition-all duration-300' onClick={() => {setMenuToggle(!menuToggle), handleClick}}>
            {!menuToggle ? (<FiMenu className='w-8 h-8 transition-all duration-300'/>) : (<FiX className='w-8 h-8 transition-all duration-300'/>)}
            {menuToggle && (
                <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={isAnimating ? controls : { x: '0', opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="w-[170px] absolute flex flex-col gap-3 items-center justify-center top-14 right-1 bg-white shadow-lg p-5 rounded-md"
            >
                { provider &&

                        Object.values(provider).map((providerTwo) =>(
                            <button className='px-4 py-3 bg-black text-white text-sm text-medium rounded-full mt-2' 
                            type='button'
                            key={providerTwo.name}
                            onClick={()=> signIn(providerTwo.id)}>
                                Sign In/Up
                            </button>
                        ))       
                }
            </motion.div>
            )}
        </button>
        )}
    </nav>
  )
};

export default Navbar