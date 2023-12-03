import React, { useEffect, useState } from 'react'
import { fetchUnsplashUserProfile } from '@/utils'
import { useRouter } from 'next/router';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import UnsplashUserProfile from '@/components/UnsplashUserProfile';

const UnslashUserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
    const fetchUser = async () => {
      if (id) {
            setLoading(true)
            try {
                const data =  await fetchUnsplashUserProfile(params.id);
                setUser(data);
            } catch (error) {
                console.error('Error fetching Unsplash user profile:', error);
            } finally {
              setLoading(false);
            }
        }
      };

      fetchUser();
    }, [id])
    
  return (
    <section className='w-full'>
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

export default page