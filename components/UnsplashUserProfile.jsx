import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const UnsplashUserProfile = ({user}) => {
    const {username} = user;
    const pathName = usePathname();
    const truncateBio = () => {
        if (user.bio) {
            return user.bio.substring(0, 50) + "...";
            } else {
                return "No bio";
             }
    }
    const truncatedBio = truncateBio();
  return (
    <>
    <div className='w-full flex flex-col md:flex-row md:justify-between gap-8 md:gap-0 items-start px-[20px] md:px-[72px] mt-10 order-2 md:order-2'>
        <div className="flex flex-col gap-3 w-[100%] md:w-[50%]">
        <Image src={user.profile_image.large} width={80} height={80} alt='Unsplash user profile photo' className='rounded-full' />
        <h1 className='text-[#0d0c22] text-lg md:text-[35px] font-bold'>{user.username}</h1>
        <h1 className='text-[#0d0c22] text-2xl md:text-[45px] md:leading-[56px] font-bold'>{truncatedBio}</h1>
        <div className="flex items-center gap-4">
            <p className='text-[#6e6d7a] text-[14px] leading-[28px]'>{user.followers_count} followers</p>
            <p className='text-[#6e6d7a] text-[14px] leading-[28px]'>{user.following_count} following</p>
            <p className='text-[#6e6d7a] text-[14px] leading-[28px]'>{user.total_likes} likes</p>
            <p className='text-[#6e6d7a] text-[14px] leading-[28px]'>{user.total_photos} photos</p>
        </div>
        <a href={user.links.html} target='blank' className='bg-[#0d0c22] rounded-full font-medium text-[14px] text-white px-3 py-2 w-[180px] h-[48px] flex items-center justify-center'>View unsplash profile</a>
        </div>
        <div className="w-full md:w-[450px] h-[300px] object-contain rounded-3xl md:rounded-3xl overflow-hidden md:order-2">
        <img src={user.photos[0].urls.full}  alt={user.photos[1].slug} className='' />
        </div>
    </div>

    <div className="w-full flex gap-3 items-center justify-center py-4 border-b border-gray-200">
    <Link href={`/unsplash-user/${username}`} className={`${pathName ===   `/unsplash-user/${username}` ? 'bg-[#0d0c22]' : 'bg-[#f8f7f4]'} text-black px-4 py-2 rounded-full`}>Photos</Link>
    <Link href={`/unsplash-user/${username}/likes`} className={`${pathName === `/unsplash-user/${username}/likes` ? 'bg-[#0d0c22]' : 'bg-[#f8f7f4]'} text-black px-4 py-2 rounded-full`}>Likes</Link>
    <Link href={`/unsplash-user/${username}/likes`} className={`${pathName === `/unsplash-user/${username}/collections` ? 'bg-[#0d0c22]' : 'bg-[#f8f7f4]'} text-black px-4 py-2 rounded-full`}>Collection</Link>
    </div>
    </>
  );
};

export default UnsplashUserProfile;