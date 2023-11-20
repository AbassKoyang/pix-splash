import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';

const ProfileInfo = () => {
  const {data:session} = useSession();
  
  return (
    <section className="w-full flex itesm-center justify center object-contain rounded-full overflow-hidden">
        <div className="w-56 h-56">
          <img src={session?.user.image} className='w-full h-full' alt='Profile Image'/>
        </div>
        <h1 className='text-3xl font-medium text-black mt-4'>{session?.user.name}</h1>
        <h1 className='text-xl font-normal text-black mt-2'>{session?.user.email}</h1>
    </section>
  )
}

export default ProfileInfo