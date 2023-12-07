import React , {useEffect}from 'react'
import { BiDownload } from 'react-icons/bi';
import {toast} from 'react-hot-toast';

const CollectionView = ({collection}) => {
    const {title, collectionDescription, authorName} = collection;
    const content = collection.content || [] ;

    async function handleDownloadImage (imageUrl, suggestedFileName) {
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

      const copyToClipboard = () => {
        navigator.clipboard.writeText(`${window.location.href}/collections/${collection._id}`).then(()=>{
            toast.success("Link copied successfully")
            },()=>{
                toast.error("Copying link failed")
            });
      }
      
  return (
    <section className='w-full mt-10 px-[20px] md:px-[72px] bg-white'>
        <div className="w-full flex flex-col gap-2 md:gap-0 md:flex-row md:items-center md:justify-between">
              <h1 className='text-xl md:text-3xl font-extrabold text-[#0d0c22]'>{title}</h1>
              <button onClick={copyToClipboard} className='w-[90.3px] h-[40px] bg-[#f8f7f6] hidden md:flex gap-2 items-center text-[13px] font-medium py-[5px] md:px-[20px] md:py-[10px]  rounded-full' aria-label='copy link to collection'>
              <svg className='w-4 h-4 text-black' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.6572 14.8282L16.2429 13.414L17.6572 11.9998C19.2193 10.4377 19.2193 7.90506 17.6572 6.34296C16.0951 4.78086 13.5624 4.78086 12.0003 6.34296L10.5861 7.75717L9.17188 6.34296L10.5861 4.92875C12.9292 2.5856 16.7282 2.5856 19.0714 4.92875C21.4145 7.27189 21.4145 11.0709 19.0714 13.414L17.6572 14.8282ZM14.8287 17.6567L13.4145 19.0709C11.0714 21.414 7.27238 21.414 4.92923 19.0709C2.58609 16.7277 2.58609 12.9287 4.92923 10.5856L6.34345 9.17139L7.75766 10.5856L6.34345 11.9998C4.78135 13.5619 4.78135 16.0946 6.34345 17.6567C7.90555 19.2188 10.4382 19.2188 12.0003 17.6567L13.4145 16.2425L14.8287 17.6567ZM14.8287 7.75717L16.2429 9.17139L9.17188 16.2425L7.75766 14.8282L14.8287 7.75717Z"></path></svg>
                <p>Copy</p>
             </button>
        </div>

        {collection && (<p className='text-[12px] md:text-[14px] text-gray-500 mt-2'>{content.length} shots</p>)}
        <p className='text-[14px] md:text-[16px] text-gray-500 mt-3'>{collectionDescription} </p>

        <div className="flex flex-col gap-2 md:flex-row md:gap-0 md:items-center md:justify-between mt-2">
            <h1 className='text-[16px] md:text-lg text-[#0d0c22] font-medium' aria-label='collection author name'>{authorName}</h1>
            <button onClick={copyToClipboard} className='w-[90.3px] h-[40px] bg-[#f8f7f6] flex md:hidden gap-2 items-center text-[13px] font-medium px-[10px] py-[5px] md:px-[20px] md:py-[10px] rounded-full' aria-label='copy link to collection'>
              <svg className='w-5 h-5 text-black' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.6572 14.8282L16.2429 13.414L17.6572 11.9998C19.2193 10.4377 19.2193 7.90506 17.6572 6.34296C16.0951 4.78086 13.5624 4.78086 12.0003 6.34296L10.5861 7.75717L9.17188 6.34296L10.5861 4.92875C12.9292 2.5856 16.7282 2.5856 19.0714 4.92875C21.4145 7.27189 21.4145 11.0709 19.0714 13.414L17.6572 14.8282ZM14.8287 17.6567L13.4145 19.0709C11.0714 21.414 7.27238 21.414 4.92923 19.0709C2.58609 16.7277 2.58609 12.9287 4.92923 10.5856L6.34345 9.17139L7.75766 10.5856L6.34345 11.9998C4.78135 13.5619 4.78135 16.0946 6.34345 17.6567C7.90555 19.2188 10.4382 19.2188 12.0003 17.6567L13.4145 16.2425L14.8287 17.6567ZM14.8287 7.75717L16.2429 9.17139L9.17188 16.2425L7.75766 14.8282L14.8287 7.75717Z"></path></svg>
                <p>Copy</p>
             </button>
            <button className='w-[148.08px] h-[40px] bg-transparent border border-gray-300 text-[13px] font-medium py-[5px] md:px-[20px] md:py-[10px]  rounded-full' aria-label='copy link to collection'>Delete collection</button>
        </div>

        <div className={`bg-white w-full col-span-4 columns-1 md:columns-1 lg:columns-1 overflow-x-hidden mt-7`}>
            {
                collection && (
                    content.map((item) => (
                        <div className="w-full md:w-[360px] flex flex-col items-center mb-4 mr-4 relative h-[400px]" key={item.id}>
                            <div className="w-full h-[85%] object-contain rounded-xl overflow-hidden">
                                <img src={item.urls.full} alt={item.description} />
                            </div>
                        <div className="w-full flex justify-between items-center mt-2">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full overflow-hidden">
                                    <img className='w-full h-full' src={item.user.profile_image.large} alt={item.description} />
                                </div>
                                <p className='text-sm font-medium text-black'>{item.user.name}</p>
                            </div>
                            <button className="p-2 rounded-full bg-[#e9e9e9] hover:bg-[#dfdede] transition-all duration-300 cursor-pointer" onClick={() => handleDownloadImage(item.urls.full, item.description)}>
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