import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BiDownload, BiHeart } from 'react-icons/bi';
import SkeletonLoader from './skeleton';
import MyDialog from './MyDialog';
import {toast} from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSession } from 'next-auth/react';
const Feed = ({ image, dataLoaded }) => {
  const {data:session} = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);


    const addToFavourites = async () => {
      const {
        id,
        created_at,
        updated_at,
        width,
        height,
        color,
        likes,
        description,
        user,
        current_user_collections,
        urls,
        links,
      } = image;
      setIsSubmitting(true);
      if(session){
        try {
          const response = await fetch("/api/favourites/new", {
            method: "POST",
            body: JSON.stringify({
              id: id,
              created_at: created_at,
              updated_at: updated_at,
              width: width,
              height: height,
              color: color,
              likes: likes,
              description: description,
              user: user,
              current_user_collections: current_user_collections,
              urls:  urls,
              links: links,
            }),
          });
  
          if (response.status === 201) {
            toast.success("Image added to favourite");  
            } else {
              toast.error('Failed to add image to favourites');
            };
  
        } catch (error) {
          console.log(error);
          throw new Error(error);
        } finally{
          setIsSubmitting(false);
        }
      } else {
        toast('Please sign in to add image to favourites', {style: {backgroundColor: 'black', color: 'white'}, duration: 1500})
      } 
      setIsSubmitting(false)
    }
    async function handleDownloadImage(imageUrl, suggestedFileName) {
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
          console.log(image)
        } catch (error) {
          console.error('Download failed:', error);
          toast.error("Failed to download image");
        }
      };
      let [isOpen, setIsOpen] = useState(false);
    
      return (<>
            {!dataLoaded ? (
              <section className="mb-4 rounded-xl overflow-hidden relative group transition-all duration-300 cursor-pointer" onClick={() => {setIsOpen(true)}}>
              <>
              <button className="absolute z-10 top-5 right-4 p-2 rounded-full bg-[#e9e9e9] hover:bg-white transition-all duration-300 cursor-pointer" onClick={(event) => {
                event.stopPropagation();
                addToFavourites();
              }}>
                {isSubmitting ? (<AiOutlineLoading3Quarters className="w-5 h-5 animate-spin"/>) : (<BiHeart className="w-5 h-5" />)}
              </button>
              <img className="w-full h-full" key={image.id} src={image.urls.small} alt={image.alt_description} />
              <div className="absolute z-10 bottom-5 left-3 items-center justify-center gap-2 hidden  md:group-hover:flex transition-all duration-300"
              onClick={(event) => event.stopPropagation()} 
              >
                <Link href='/'><img className="w-10 h-10 rounded-full border-white border-2" src={image.user.profile_image.small} alt={image.user.name} /></Link>
                <Link href='/'><p className="font-medium text-sm text-black px-2 py-2 rounded-full cursor-pointer bg-[#e9e9e9]">{image.user.username}</p></Link>
              </div>
              <button className="hidden  md:group-hover:block  absolute z-10 bottom-5 right-4 p-2 rounded-full bg-[#e9e9e9] hover:bg-white transition-all duration-300 cursor-pointer" onClick={(event) => {
                event.stopPropagation();
                handleDownloadImage(image.urls.full, image.alt_description);}}>
                <BiDownload className="w-5 h-5" />
              </button>
            </>
           <MyDialog isOpen={isOpen} closeModal={() => {setIsOpen(false)}} images={image} />
         </section>
            ) : (
              <SkeletonLoader/>
            )}
            </>
      );
  };
  
  export default Feed;