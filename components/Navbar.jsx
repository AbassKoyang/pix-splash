"use client"
import React , {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BiSearch } from 'react-icons/bi'
import { BsImages, BsMenuButton } from 'react-icons/bs'
import { FiMenu } from 'react-icons/fi'
import { useQuery } from './useQuery'
import { useStyleRegistry } from 'styled-jsx'

const Navbar = ({otherStyles, onSearch }) => {
const [query, setQuery] = useQuery();
const [filled, setFilled] = useState(false)


const handlePress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSearch();
          }
}
const handleSearch = () => {
        if(query === '') {
            alert("Input field cannot be empty")
        }else {
            setFilled(false)
            onSearch(query);
        }
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

            <div className="w-full max-w-[20rem] md:max-w-2xl flex justify-between items-center p-2 lg:p-3 bg-gray-200 lg:bg-gray-300 rounded-full lg:rounded-lg">
                <BsImages className='w-5 h-5 hidden md:block'/>
                <input type="text" placeholder="Search for photos..." required className="w-[70%] h-full outline-none border-none stroke-none text-gray-700 text-sm md:text-lg bg-transparent" value={query} onKeyDown={handlePress} onChange={(e) =>{setQuery(e.target.value)}}/>
                <button onClick={handleSearch}><BiSearch className='w-6 h-6 px-1 py-1 rounded-full bg-black text-white'/></button>
            </div>
        </div>

        <button className='block lg:hidden'><FiMenu className='w-6 h-6'/></button>
        <button className='px-3 py-2 rounded-sm bg-black text-white text-lg font-normal hidden lg:block'>Sign In</button>
    </nav>
  )
}

export default Navbar