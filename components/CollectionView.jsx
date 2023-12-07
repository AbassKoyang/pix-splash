import React , {useEffect}from 'react'
import { BiDownload } from 'react-icons/bi';
import {toast} from 'react-hot-toast';

const CollectionView = ({collection}) => {
    const {title, collectionDescription, authorName} = collection;
    const content = collection.content;

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
      
  return (
    <section className='w-full mt-10 px-[72px] bg-white'>
        <div className="w-full flex items-center justify-between">
              <h1 className='text-3xl font-extrabold text-[#0d0c22]'>{title}</h1>
              <button className='bg-[#f8f7f6] text-[13px] font-medium px-[20px] py-[10px] rounded-full' aria-label='copy link to collection'>Copy</button>
        </div>

        {collection && (<p className='text-[14px] text-gray-500 mt-4'>{content.length} shots</p>)}
        <p className='text-[16px] text-gray-500 mt-3'>{collectionDescription} </p>

        <div className="flex items-center justify-between mt-3">
            <h1 className='text-l3 text-[#0d0c22] font-medium' aria-label='collection author name'>{authorName}</h1>
            <button className='bg-transparent border border-gray-300 text-[13px] font-medium px-[20px] py-[10px] rounded-full' aria-label='copy link to collection'>Delete collection</button>
        </div>

        <div className={`bg-white w-full col-span-4 columns-1 md:columns-3 lg:columns-3 overflow-x-hidden`}>
            {
                collection && (
                    content.map((item) => (
                        <div className="w-full flex flex-col items-center px-3 mb-4 relative" key={item.id}>
                            <div className="w-full object-contain">
                                <img src={item.urls.full} alt={item.description} />
                            </div>
                        <div className="w-full flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full overflow-hidden">
                                    <img className='w-full h-full' src={item.user.profile_image.large} alt={item.description} />
                                </div>
                                <p className='text-sm font-medium text-black'>{item.user.name}</p>
                            </div>
                            <button className="p-2 rounded-full bg-[#e9e9e9] hover:bg-white transition-all duration-300 cursor-pointer" onClick={handleDownloadImage(item.urls.full, item.description)}>
                                <BiDownload className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    ))
                )

            }
        </div>

    </section>
  )
}

export default CollectionView