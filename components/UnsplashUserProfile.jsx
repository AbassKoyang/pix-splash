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
                <a href={portfolio_url} className='p-2 rounded-full bg-[#f8f7f4] hover:bg-[#f8f8be]'>
                <svg className='text-[#0d0c22] w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.04932 13.0001H7.52725C7.70624 16.2689 8.7574 19.3054 10.452 21.881C5.98761 21.1872 2.5001 17.5403 2.04932 13.0001ZM2.04932 11.0001C2.5001 6.4598 5.98761 2.81288 10.452 2.11914C8.7574 4.69468 7.70624 7.73123 7.52725 11.0001H2.04932ZM21.9506 11.0001H16.4726C16.2936 7.73123 15.2425 4.69468 13.5479 2.11914C18.0123 2.81288 21.4998 6.4598 21.9506 11.0001ZM21.9506 13.0001C21.4998 17.5403 18.0123 21.1872 13.5479 21.881C15.2425 19.3054 16.2936 16.2689 16.4726 13.0001H21.9506ZM9.53068 13.0001H14.4692C14.2976 15.7829 13.4146 18.3733 11.9999 20.5916C10.5852 18.3733 9.70229 15.7829 9.53068 13.0001ZM9.53068 11.0001C9.70229 8.21722 10.5852 5.62684 11.9999 3.40853C13.4146 5.62684 14.2976 8.21722 14.4692 11.0001H9.53068Z"></path></svg>
                </a>
                <a href={`https://instagram.com/${instagram_username}`} className='p-2 rounded-full bg-[#f8f7f4] hover:bg-[#c9c9c6]'>
                    <svg className='text-[#0d0c22] w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.0281 2.00098C14.1535 2.00284 14.7238 2.00879 15.2166 2.02346L15.4107 2.02981C15.6349 2.03778 15.8561 2.04778 16.1228 2.06028C17.1869 2.10944 17.9128 2.27778 18.5503 2.52528C19.2094 2.77944 19.7661 3.12278 20.3219 3.67861C20.8769 4.23444 21.2203 4.79278 21.4753 5.45028C21.7219 6.08694 21.8903 6.81361 21.9403 7.87778C21.9522 8.14444 21.9618 8.36564 21.9697 8.58989L21.976 8.78397C21.9906 9.27672 21.9973 9.8471 21.9994 10.9725L22.0002 11.7182C22.0003 11.8093 22.0003 11.9033 22.0003 12.0003L22.0002 12.2824L21.9996 13.0281C21.9977 14.1535 21.9918 14.7238 21.9771 15.2166L21.9707 15.4107C21.9628 15.6349 21.9528 15.8561 21.9403 16.1228C21.8911 17.1869 21.7219 17.9128 21.4753 18.5503C21.2211 19.2094 20.8769 19.7661 20.3219 20.3219C19.7661 20.8769 19.2069 21.2203 18.5503 21.4753C17.9128 21.7219 17.1869 21.8903 16.1228 21.9403C15.8561 21.9522 15.6349 21.9618 15.4107 21.9697L15.2166 21.976C14.7238 21.9906 14.1535 21.9973 13.0281 21.9994L12.2824 22.0002C12.1913 22.0003 12.0973 22.0003 12.0003 22.0003L11.7182 22.0002L10.9725 21.9996C9.8471 21.9977 9.27672 21.9918 8.78397 21.9771L8.58989 21.9707C8.36564 21.9628 8.14444 21.9528 7.87778 21.9403C6.81361 21.8911 6.08861 21.7219 5.45028 21.4753C4.79194 21.2211 4.23444 20.8769 3.67861 20.3219C3.12278 19.7661 2.78028 19.2069 2.52528 18.5503C2.27778 17.9128 2.11028 17.1869 2.06028 16.1228C2.0484 15.8561 2.03871 15.6349 2.03086 15.4107L2.02457 15.2166C2.00994 14.7238 2.00327 14.1535 2.00111 13.0281L2.00098 10.9725C2.00284 9.8471 2.00879 9.27672 2.02346 8.78397L2.02981 8.58989C2.03778 8.36564 2.04778 8.14444 2.06028 7.87778C2.10944 6.81278 2.27778 6.08778 2.52528 5.45028C2.77944 4.79194 3.12278 4.23444 3.67861 3.67861C4.23444 3.12278 4.79278 2.78028 5.45028 2.52528C6.08778 2.27778 6.81278 2.11028 7.87778 2.06028C8.14444 2.0484 8.36564 2.03871 8.58989 2.03086L8.78397 2.02457C9.27672 2.00994 9.8471 2.00327 10.9725 2.00111L13.0281 2.00098ZM12.0003 7.00028C9.23738 7.00028 7.00028 9.23981 7.00028 12.0003C7.00028 14.7632 9.23981 17.0003 12.0003 17.0003C14.7632 17.0003 17.0003 14.7607 17.0003 12.0003C17.0003 9.23738 14.7607 7.00028 12.0003 7.00028ZM12.0003 9.00028C13.6572 9.00028 15.0003 10.3429 15.0003 12.0003C15.0003 13.6572 13.6576 15.0003 12.0003 15.0003C10.3434 15.0003 9.00028 13.6576 9.00028 12.0003C9.00028 10.3434 10.3429 9.00028 12.0003 9.00028ZM17.2503 5.50028C16.561 5.50028 16.0003 6.06018 16.0003 6.74943C16.0003 7.43867 16.5602 7.99944 17.2503 7.99944C17.9395 7.99944 18.5003 7.43954 18.5003 6.74943C18.5003 6.06018 17.9386 5.49941 17.2503 5.50028Z"></path></svg>
                </a>
                <a href={`https://twitter.com/${twitter_username}`} className='p-2 rounded-full bg-[#f8f7f4] hover:bg-[#c9c9c6]'>
                    <svg className='text-[#0d0c22] w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.2048 2.25H21.5128L14.2858 10.51L22.7878 21.75H16.1308L10.9168 14.933L4.95084 21.75H1.64084L9.37084 12.915L1.21484 2.25H8.04084L12.7538 8.481L18.2048 2.25ZM17.0438 19.77H18.8768L7.04484 4.126H5.07784L17.0438 19.77Z"></path></svg>
                </a>
            </div>
        </div>
        </div>
    </div>
  );
};

export default UnsplashUserProfile;