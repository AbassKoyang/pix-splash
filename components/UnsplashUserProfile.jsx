import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { BsGlobe } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsTwitterX } from "react-icons/bs";

const UnsplashUserProfile = ({user}) => {
    const {username, portfolio_url, twitter_username, instagram_username} = user;
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
    <div className='w-full flex flex-col md:flex-row md:justify-between gap-8 md:gap-0 items-start px-[20px] md:px-[72px] my-10 order-2 md:order-2'>
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
        <div className='w-full md:w-[450px] flex flex-col items-end justify-start'>
            <div className="w-full md:w-[450px] h-[300px] object-contain rounded-3xl md:rounded-3xl overflow-hidden">
            <img src={user.photos[0].urls.full}  alt={user.photos[1].slug} className='' />
            </div>
            <div className="w-full mt-6">
            <p className='text-[#0d0c22] text-[16px] md:text-[18px] leading-[28px] font-semibold'>Socials</p>
            <div className="w-full flex gap-6 items-center mt-2">
                <a href={portfolio_url} className='p-2 rounded-full bg-[#f8f7f4] hover:bg-[#0d0c22] group'><BsGlobe className='text-[#0d0c22] group-hover:text-white w-6 h-6'/></a>
                <a href={`https://twitter.com/${twitter_username}`} className='p-2 rounded-full bg-[#f8f7f4] hover:bg-[#0d0c22] group'><BsTwitterX className='text-[#0d0c22] group-hover:text-white w-6 h-6'/></a>
                <a href={`https://instagram.com/${instagram_username}`} className='p-2 rounded-full bg-[#f8f7f4] hover:bg-[#0d0c22] group'><BsInstagram className='text-[#0d0c22] group-hover:text-white w-6 h-6'/></a>
            </div>
        </div>
        </div>
    </div>
  );
};

export default UnsplashUserProfile;