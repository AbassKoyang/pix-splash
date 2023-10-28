import React, { useEffect, useState } from 'react';
import { BiDownload, BiHeart } from 'react-icons/bi';
import SkeletonLoader from './skeleton';
import MyDialog from './MyDialog';

const Feed = ({ image, dataLoaded }) => {
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
        } catch (error) {
          console.error('Download failed:', error);
        }
      };
      let [isOpen, setIsOpen] = useState(false);
    
      return (<>
            {!dataLoaded ? (
              <div className="mb-4 rounded-xl overflow-hidden relative group transition-all duration-300 cursor-pointer" onClick={() => {setIsOpen(true)}}>
              <>
              <button className="absolute z-10 top-5 right-4 p-2 rounded-full bg-[#e9e9e9] hover:bg-white transition-all duration-300 cursor-pointer" onClick={() => handleDownloadImage(image.urls.full, image.alt_description)}>
                <BiHeart className="w-5 h-5" />
              </button>
              <img className="w-full h-full" key={image.id} src={image.urls.small} alt={image.alt_description} />
              <div className="absolute z-10 bottom-5 left-3 items-center justify-center gap-2 hidden  md:group-hover:flex transition-all duration-300">
                <img className="w-10 h-10 rounded-full border-white border-2" src={image.user.profile_image.small} alt={image.user.name} />
                <p className="font-medium text-sm text-black px-2 py-2 rounded-full cursor-pointer bg-[#e9e9e9]">{image.user.username}</p>
              </div>
              <button className="hidden  md:group-hover:block  absolute z-10 bottom-5 right-4 p-2 rounded-full bg-[#e9e9e9] hover:bg-white transition-all duration-300 cursor-pointer" onClick={() => handleDownloadImage(image.urls.full, image.alt_description)}>
                <BiDownload className="w-5 h-5" />
              </button>
            </>
           <MyDialog isOpen={isOpen} closeModal={() => {setIsOpen(false)}} images={image} />
         </div>
            ) : (
              <SkeletonLoader/>
            )}
            </>
      );
  };
  
  export default Feed;