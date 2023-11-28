"use client"
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BiSearch } from 'react-icons/bi';
import { BsImages } from 'react-icons/bs';
import { FiMenu, FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '@/redux/searchSplice';
import {motion, useAnimation } from 'framer-motion';
import { useSession, getProviders, signIn, signOut } from 'next-auth/react';
import { fetchImages } from '@/utils';


const Hero = ({onSearch}) => {

const {data:session} = useSession();
const [providers, setProviders] = useState(null)
const [filled, setFilled] = useState(false);
const dispatch = useDispatch();
const query = useSelector((state) => state.search.query);
const [menuToggle, setMenuToggle] = useState(false)
const [isAnimating, setIsAnimating] = useState(false);
const [isConfirmSignOut, setIsConfirmSignOut] = useState(false);


useEffect(() => {
    const setUpProviders = async () => {
        const response = await getProviders();
        setProviders(response)
        console.log(response)
    }

    setUpProviders();
}, [])

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
        setFilled(true)
    }else {
        setFilled(false);
        onSearch(query);
        console.log(query)
    }
  };



const controls = useAnimation();
const handleClick = async () => {
setIsAnimating(true);
await controls.start({ x: 0, opacity: 1 });
};

  return (

    <section className='w-full h-[500px] bg-contain relative' style={{ backgroundImage: "url(https://images.pexels.com/photos/18785909/pexels-photo-18785909.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500)" }}>
        <div className="w-full h-[500px] top-0 left-0 absolute bg-black bg-opacity-60 z-0"/>
        <nav className={`w-full flex justify-between items-center px-4 py-8 lg:px-8 lg:py-5 bg-transparent z-10`}>
                <Link href='/' className="text-2xl md:text-3xl font-extrabold text-white z-10">
                    PixSplash
                </Link>

            {session?.user ? (
             <>
                <button className='block transition-all duration-300 z-30' onClick={() => {setMenuToggle(!menuToggle), handleClick}}>
                    <Image src={session.user.image} alt='Profile Image' width={50} height={50} className='object-contain rounded-full'/>
                </button>
                    {menuToggle && (
                    <motion.div
                    initial={{ x: '100%', opacity: 0 }}
                    animate={isAnimating ? controls : { x: '0', opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="w-[90vw] md:max-w-md fixed flex flex-col gap-3 items-start justify-center top-28 right-4 bg-white shadow-lg p-6 rounded-md z-30"
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

                <div className={`${isConfirmSignOut? 'flex justify-center items-center' : 'hidden'} fixed top-0 right-0 w-[100vw] h-[100vh]  bg-black/25 z-50`}>
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
                  { providers &&

                    Object.values(providers).map((providerTwo) =>(
                        <button 
                        type="button"
                        key={providerTwo.name}
                        onClick={() => signIn(providerTwo.id)}
                        className='px-4 py-2 rounded-full bg-white text-black text-lg font-normal z-10'
                        >
                        Sign In
                        </button>
                    ))
                }
                </>
            )}
        </nav>


        <div className="w-full mt-32 flex flex-col justify-center items-center z-10">
            <h1 className='max-w-4xl text-white text-center text-4xl lg:text-5xl font-extrabold mb-5 z-10'>The best free stock photos, royalty free images from Unsplash!</h1>
            <form className="w-full max-w-[18rem] md:max-w-xl flex justify-between items-center px-3 py-3 bg-white rounded-full z-10">
                <input 
                    name='search' 
                    type="text"
                    placeholder="Search for photos..." 
                    className="w-[90%] h-full outline-none border-none stroke-none text-gray-700 bg-white" 
                    value={query}
                    onKeyDown={handlePress}
                    onChange={(e) => {handleQueryChange(e)}}
                />
                <button
                  type='button'
                  onClick={handleSearch}
                >
                    <BiSearch 
                     className='w-6 h-6 px-1 py-1 rounded-full bg-black text-white'
                     />
                </button>
            </form>
            <p className={`text-gray-700 text-center font-normal text-lg mx-3 z-10 ${filled ? 'block' : 'hidden'}`}>Input field cannot be empty.</p>
        </div>
    </section>
  )
}

export default Hero