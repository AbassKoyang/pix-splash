import Image from 'next/image'
import React, {useState} from 'react'

const Sidebar = ({onSearch}) => {
    const [searchQuery, setSearchQuery] = useState('');

const handleSearch = () => {
    onSearch(searchQuery);
  };
  return (
    <div className='hidden lg:flex flex-col justify-start col-span-1 sticky top-[6.3rem] h-fit bg-white border-black border-r border-t border-b mt-3 p-3 rounded-md '>
        <div className="flex flex-col gap-2">
        <h1 className='text-black text-lg md:text-4xl font-bold mb-4'>Categories</h1>
            <a className="flex justify-between items-center px-8 py-4 bg-[#e9e9e9] rounded-md cursor-pointer" onClick={(e) => {setSearchQuery(e.currentTarget.innerText), handleSearch()}}>
            <p className='font-medium text-black text-sm md:text-2xl'>Animals</p>
            <Image src='/puppy.avif' alt='Puppy' width={55} height={55} className='rounded-md'/>
            </a>
            <a className="flex justify-between items-center px-8 py-4 bg-[#e9e9e9] rounded-md cursor-pointer" onClick={(e) => {setSearchQuery(e.currentTarget.innerText), handleSearch()}}>
            <p className='font-medium text-black text-sm md:text-2xl'>Fashion</p>
            <Image src='/fashion.webp' alt='Puppy' width={55} height={55} className='rounded-md'/>
            </a>
            
            <a className="flex justify-between items-center px-8 py-4 bg-[#e9e9e9] rounded-md cursor-pointer" onClick={(e) => {setSearchQuery(e.currentTarget.innerText), handleSearch()}}>
            <p className='font-medium text-black text-sm md:text-2xl'>Nature</p>
            <Image src='/nature.jpg' alt='Puppy' width={55} height={55} className='rounded-md'/>
            </a>
            <a className="flex justify-between items-center px-8 py-4 bg-[#e9e9e9] rounded-md cursor-pointer"  onClick={(e) => {setSearchQuery(e.currentTarget.innerText), handleSearch()}}>
            <p className='font-medium text-black text-sm md:text-2xl'>Animals</p>
            <Image src='/puppy.avif' alt='Puppy' width={55} height={55} className='rounded-md'/>
            </a>
            <a className="flex justify-between items-center px-8 py-4 bg-[#e9e9e9] rounded-md cursor-pointer" onClick={(e) => {setSearchQuery(e.currentTarget.innerText), handleSearch()}}>
            <p className='font-medium text-black text-sm md:text-2xl'>Fashion</p>
            <Image src='/fashion.webp' alt='Puppy' width={55} height={55} className='rounded-md'/>
            </a>
            <a className="flex justify-between items-center px-8 py-4 bg-[#e9e9e9] rounded-md cursor-pointer"  onClick={(e) => {setSearchQuery(e.currentTarget.innerText), handleSearch()}}>
            <p className='font-medium text-black text-sm md:text-2xl'>Wildlife</p>
            <Image src='/wildlife.avif' alt='Puppy' width={55} height={55} className='rounded-md'/>
            </a>

            <a className="flex justify-between items-center px-8 py-4 bg-[#e9e9e9] rounded-md cursor-pointer" onClick={(e) => {setSearchQuery(e.currentTarget.innerText), handleSearch()}}>
            <p className='font-medium text-black text-sm md:text-2xl'>Nature</p>
            <Image src='/nature.jpg' alt='Puppy' width={55} height={55} className='rounded-md'/>
            </a>
        </div>
    </div>
  )
}

export default Sidebar