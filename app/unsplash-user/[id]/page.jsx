"use client"
import React, { useEffect, useState } from 'react'
import { fetchUnsplashUserProfile } from '@/utils'
import { useRouter, usePathname } from 'next/navigation';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import UnsplashUserProfile from '@/components/UnsplashUserProfile';
import Navbar from '@/components/Navbar';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const UnslashUserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const [pagination, setPagination] = useState(1);
    const searchQuery = useSelector((state) => state.search.query);
    const pathName = usePathname();
    const username = pathName.toString().slice(15, pathName.length);


    const handleSearch = async () => {
        const newImages = await fetchImages(searchQuery, pagination);
        if(newImages.length > 0){
          dispatch(setImages(newImages));
          router.push('/')
        } else {
          toast.error("Oops! No result.")
        }
      };

    useEffect(() => {
    const fetchUser = async () => {
            setLoading(true)
            try {
                const data =  await fetchUnsplashUserProfile(username);
                console.log('data', data);
                console.log(pathName)
                setUser(data);
            } catch (error) {
                console.error('Error fetching Unsplash user profile:', error);
            } finally {
              setLoading(false);
            }
      };

      fetchUser();
    }, [])
    
  return (
    <section className='w-full'>
        <Navbar isSearchAllowed={true} otherStyles={`${'static'}`} onSearch={handleSearch}/>
        {loading ? (
        <p>Loading... <AiOutlineLoading3Quarters/></p>
      ) : user ? (
        <UnsplashUserProfile user={user} />
      ) : (
        <p>User not found.</p>
      )}
    </section>
  )
}

export default UnslashUserProfile