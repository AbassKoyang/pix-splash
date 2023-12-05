import React from 'react'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { BiDownload, BiHeart } from 'react-icons/bi';
import Link from 'next/link';
import {toast} from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const Favourites = () => {
    const {data:session} = useSession();
    const [favouritePosts, setFavouritePosts] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFetchingFavourites, setIsFetchingFavourites] = useState(false);
    const [truncatedEmail, setTruncatedEmail] = useState(null);


useEffect(() => {
  if(session?.user.id){
  const fetchFavourites = async () => {
    setIsFetchingFavourites(true)
    try {
    const response = await fetch(`/api/users/${session?.user.id}/favourites`);
    const favourites = await response.json();
    setFavouritePosts(favourites);
    } catch (error) {
      console.log(error)
    }finally{
      setIsFetchingFavourites(false)
    }
  }
      fetchFavourites();
  }
}, [])

const deleteFromFavourites = async (favouritePost) => {
  setIsSubmitting(true);
  const hasConfirmed = confirm("Are you sure you want to remove this image from favourites?");
 if(hasConfirmed){
  try {
    await fetch(`api/favourites/${favouritePost._id.toString()}`,{
      method: 'DELETE'
    });

    const filteredFavourites = favouritePosts.filter((fP) => fP._id !== favouritePost._id);
    setFavouritePosts(filteredFavourites);
    toast.success('Image removed successfully!');
  } catch (error) {
    toast.error('Failed to delete image from favourites.')
    console.log(error)
  }finally{
  setIsSubmitting(false);
  }
 };
 setIsSubmitting(false);
};


 const handleDownloadImage = async (imageUrl, suggestedFileName) => {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error('Image download failed');
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = suggestedFileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Your download has started.")
  } catch (error) {
    console.error('Download failed:', error);
    toast.error("Failed to download image");
  }
};
useEffect(() => {
  if(session){
    const truncateEmail = () => {
        const email = session?.user?.email || '' ;
        const truncatedEmail = email.toString().toLowerCase().replace('@gmail.com', '');
        setTruncatedEmail(truncatedEmail);
    }
    truncateEmail();
}
}, [session]);

  return (
    <>
    <div className="w-full flex items-center justify-center gap-3 py-4 px-6 lg:px-14 mt-5 border-b border-gray-300">
          <button className="bg-black text-white px-4 py-2 rounded-full">Favourites</button>
          <Link href={`/${truncatedEmail}/collections`} className="bg-[#f8f7f4] text-black px-4 py-2 rounded-full">Collections</Link>
    </div>
    <section className={`bg-white ${isFetchingFavourites ? 'flex justify-center items-center overflow-y-hidden' : 'col-span-4 columns-1 md:columns-3 lg:columns-3'} pt-4 px-6 lg:px-14 overflow-x-hidden`}>
        {
            isFetchingFavourites ? (
              <div className='flex items-center gap-1'>
                  <p className='text-[15px] text-[#0d0c22] font-semibold'>Loading favourites...</p> <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin"/>
              </div>
            ) : (
              favouritePosts.map((favouritePost) => (
                <div className="w-full flex flex-col items-center px-3 mb-4 relative" key={favouritePost.id}>
                    <div className="w-full h-[250px] mb-4 rounded-lg overflow-hidden object-contain group transition-all duration-300">
                      <img src={favouritePost.urls.full} alt={favouritePost.description} className='' />
                      <button className="absolute z-10 top-4 right-8 p-2 rounded-full bg-[#e9e9e9] hover:bg-white transition-all duration-300 cursor-pointer" onClick={(event) => {
                      event.stopPropagation();
                      handleDownloadImage(favouritePost.urls.full, favouritePost.description);}}>
                      <BiDownload className="w-4 h-4" />
                    </button>
                    </div>
                  <div className="w-full flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full overflow-hidden">
                        <img className='w-full h-full' src={favouritePost.user.profile_image.large} alt={favouritePost.description} />
                      </div>
                      <p className='text-sm font-medium text-black'>{favouritePost.user.name}</p>
                    </div>
                    <button className="bg-black rounded-full p-2 cursor-pointer" onClick={(event) => {
                        event.stopPropagation();
                        deleteFromFavourites(favouritePost);
                      }}>{isSubmitting ? (<AiOutlineLoading3Quarters className="w-3 h-3 animate-spin text-white"/>) : (<BiHeart className="w-3 h-3 text-white" />)}
                    </button>
                  </div>
                </div>
              ))
            )
        }
    </section>
    </>
  )
}

export default Favourites