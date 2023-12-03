import Image from 'next/image';
import React from 'react'

const UnsplashUserProfile = ({user}) => {
  return (
    <div className='w-full flex justify-between items-center'>
        <div className="flex flex-col gap-3">
        <Image src={user.profile_image.small} width={50} height={50} alt='Unsplash user profile photo' className='rounded-full' />
        <h1 className='text-[#0d0c22] text-[32px] font-bold'>{user.username}</h1>
        <h1 className='text-[#0d0c22] text-[48px] font-bold'>{user.bio}</h1>
        <div className="flex items-center gap-4">
            <p className='text-[#6e6d7a] text-[16px] leading-[28px]'>{user.followers_count} followers</p>
            <p className='text-[#6e6d7a] text-[16px] leading-[28px]'>{user.following_count} following</p>
            <p className='text-[#6e6d7a] text-[16px] leading-[28px]'>{user.total_likes} likes</p>
            <p className='text-[#6e6d7a] text-[16px] leading-[28px]'>{user.total_photos} photos</p>
        </div>
        </div>
        <div className="w-[545px] h-[408.75px] object-contain rounded-2xl overflow-hidden">
        <img src={user.profile_image.small}  alt='Unsplash user profile photo' className='' />
        </div>
    </div>
  );
};

export default UnsplashUserProfile;