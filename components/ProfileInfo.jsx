import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';

const ProfileInfo = () => {
  const {data:session} = useSession();
  
  return (
    <section className="w-full flex flex-col items-center justify center mt-16 px-14">
        <div className="w-24 h-24 md:w-[120px] md:h-[120px] object-contain rounded-full overflow-hidden">
          <img src={session?.user.image} className='w-full h-full' alt='Profile Image'/>
        </div>
        <h1 className='text-xl md:text-2xl font-medium text-black mt-4'>{session?.user.name}</h1>
        <h1 className='text-sm md:text-sm font-normal text-black mt-0'>{session?.user.email}</h1>

        <div className="w-full flex items-center justify-center gap-3 py-4 mt-5 border-b border-gray-300">
          <button className="bg-black text-white px-4 py-2">Saved</button>
          <button className="bg-black text-white px-4 py-2">Favourites</button>
        </div>
    </section>
  )
}

export default ProfileInfo