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

const Navbar = ({otherStyles, onSearch, isSearchAllowed }) => {

const { data: session } = useSession() ;
const [provider, setProvider] = useState(null)
const [filled, setFilled] = useState(false)
const dispatch = useDispatch();
const query = useSelector((state) => state.search.query);
const [menuToggle, setMenuToggle] = useState(false)
const [isAnimating, setIsAnimating] = useState(false);
const [isConfirmSignOut, setIsConfirmSignOut] = useState(false);

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

const controls = useAnimation();
const handleClick = async () => {
setIsAnimating(true);
await controls.start({ x: 0, opacity: 1 });
};


  return (
    <nav className={`w-full justify-between items-center px-3 py-3 lg:px-8 lg:py-3 ${otherStyles} bg-white z-20 shadow-lg`}>
        <div className="flex items-center">
            <Link href='/' className="text-2xl font-bold text-black hidden lg:block">
                PixSplash
            </Link>
            <Link href='/' className="text-2xl font-bold text-black block lg:hidden">
                PS
            </Link>
        </div>

            <div className={`w-full max-w-[15rem] md:max-w-4xl ${isSearchAllowed ? 'flex' : 'hidden'} justify-between items-center p-2 pl-3 lg:px-3 lg:py-3 bg-gray-200 lg:bg-gray-300 rounded-full`}>
                <input type="text" placeholder="Search for photos..." required className="w-[90%] h-full outline-none border-none stroke-none text-gray-700 text-sm md:text-[16px] bg-transparent" value={query} onKeyDown={handlePress} onChange={(e) => {handleQueryChange(e)}}/>
                <button onClick={handleSearch}><BiSearch className='w-6 h-6 px-1 py-1 rounded-full bg-black text-white'/></button>
            </div>


        {session?.user ? (

                <>
                <button className='block transition-all duration-300' onClick={() => {setMenuToggle(!menuToggle), handleClick}}>
                    <Image src={session.user.image} alt='Profile Image' width={50} height={50} className='object-contain rounded-full'/>
                </button>
                    {menuToggle && (
                        <motion.div
                        initial={{ x: '100%', opacity: 0 }}
                        animate={isAnimating ? controls : { x: '0', opacity: 1 }}
                        transition={{ duration: 0.7 }}
                        className="w-[90vw] md:max-w-md fixed flex flex-col gap-3 items-start justify-center top-24 right-2 md:right-4 bg-white shadow-lg p-6 rounded-md"
                    >
                        <div className="w-full flex flex-col items-center justify-center gap-2">
                        <Link href='/profile'><Image src={session.user.image} width={90} height={90} alt='Profile Image' className='object-contain rounded-full'/></Link>
                            <p className='font-medium text-black text-lg'>{session.user.name}</p>
                        </div>
                        <Link href='/' className='text-gray-700 font-normal text-sm'>Favourites</Link>
                        <Link href='/' className='text-gray-700 font-normal text-sm'>Saved</Link>
                        <button className="w-full border-t-[0.5px] border-gray-100 pt-3 text-black" onClick={() => {setMenuToggle(false), setIsConfirmSignOut(true), handleClick}}>
                            Sign Out
                        </button>
                        <button className='rounded-full bg-gray-200 p-2 absolute top-1 right-1'><FiX className='w-4 h-4' onClick={()=> setMenuToggle(false)}/></button>
                    </motion.div>
                    )}

                    <div className={`${isConfirmSignOut? 'flex justify-center items-center' : 'hidden'} fixed top-0 right-0 w-[100vw] h-[100vh]  bg-black/25`}>
                    <div className='p-4 rounded-md bg-white opacity-100'>
                        <h1 className='font-medium text-lg md:text-3xl max-w-sm md:max-w-md mb-3'>Are you sure you want to sign out?</h1>
                        <div className="flex items-center gap-3">
                            <button className='px-2 py-1 lg:px-3 lg:py-2 text-[12px] md:text-lg rounded-full text-white bg-black' onClick={() => signOut()}>Sign Out</button>
                            <button className='text-[14px] md:text-lg text-gray-700 font-medium'onClick={() => setIsConfirmSignOut(false)}>Cancel</button>
                        </div>
                    </div>
                    </div>
                </>

            ) : (

                   <>
                   <button className='relative block lg:hidden' onClick={()=> setMenuToggle(!menuToggle)}>
                   {!menuToggle ? (<FiMenu className='w-8 h-8'/>) : (<FiX className='w-8 h-8'/>)}
                    {menuToggle && (
                        <motion.div
                        initial={{ x: '100%', opacity: 0 }}
                        animate={isAnimating ? controls : { x: '0', opacity: 1 }}
                        transition={{ duration: 0.7 }}
                        className="w-[150px] absolute flex flex-col gap-3 items-center justify-center top-14 right-2 bg-white shadow-lg p-6 rounded-md"
                    >
                        { provider &&

                        Object.values(provider).map((providerTwo) =>(
                            <button 
                            type="button"
                            key={providerTwo.name}
                            onClick={() => signIn(providerTwo.id)}
                            className='px-3 py-2 rounded-full text-white bg-black'
                            >
                            Sign In
                            </button>
                        ))       
                }
                    </motion.div>
                    )}
                    </button>

                    { provider &&

                        Object.values(provider).map((providerTwo) =>(
                            <button 
                            type="button"
                            key={providerTwo.name}
                            onClick={() => signIn(providerTwo.id)}
                            className='px-4 py-2 rounded-full bg-black text-white text-lg font-normal hidden lg:block'
                            >
                            Sign In
                            </button>
                        ))       
                }
                   </>

            )}
    </nav>
  )
};

export default Navbar