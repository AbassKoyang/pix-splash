'use client'
import React, {useState, Fragment, useEffect} from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { BsX } from 'react-icons/bs';
import { fetchImageStats } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { setDataQuery } from '@/redux/statsSplice';


const MoreInfo = ({isOpen, image, closeModal,}) => {
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState(null)
    const {urls, links, user, id, color, likes, description, created_at, updated_at, width, height} = image;
    // const statsData = useSelector((state) => state.stats.data);
    

    const handleMoreInfo = async () => {
      setLoading(true)
      const imageStats = await fetchImageStats(id);
      if(imageStats){
        setStats(imageStats);
      } else {
        toast.error("Error fetching image stats")
      }
      setLoading(false)
      console.log(stats)
    };
    
    useEffect(() => {
      handleMoreInfo();
    }, [id]);

    const truncateDate = () => {
      if(created_at){
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const monthPosition = parseInt(created_at.toString().substring(5,7));
      const month = months[monthPosition -1];
      const day = parseInt(created_at.toString().substring(8,10));
      const year = parseInt(created_at.toString().substring(0,4));
      return `${month} ${day}, ${year}`;
      }

    };
    
    const truncatedDate = truncateDate();

  const truncateDownload = () => {
    if(stats != null){
      if (stats.downloads.total >= 1000000) {
        return (stats.downloads.total/100000).toFixed(1) + 'M'
      } else if (stats.downloads.total >= 1000 && stats.downloads.total < 1000000) {
        return (stats.downloads.total/1000).toFixed(2) + 'K'
      } else {
        return (stats.downloads.total)
      }
    }
  }
  const truncatedDownload = truncateDownload();

  const truncateViews = () => {
    if(stats != null){
      if (stats.views.total >= 1000000) {
        return (stats.views.total/100000).toFixed(1) + 'M'
      } else if (stats.views.total >= 1000 && stats.views.total < 1000000) {
        return (stats.views.total/1000).toFixed(2) + 'K'
      } else {
        return (stats.views.total)
      }
    }
  }
  const truncatedViews = truncateViews();

  const truncateLikes = () => {
    if(stats != null && likes){
      if (likes >= 1000000) {
        return (likes/1000000).toFixed(2) + 'M'
      } else if (likes >= 1000 && likes < 1000000) {
        return (likes/1000).toFixed(2) + 'K'
      } else {
        return (likes)
      }
    }
  }
  const truncatedLikes = truncateLikes();
    return (
       <div className={`w-[100vw] h-[100vh] fixed top-0 left-0 bg-black/25 ${isOpen ? 'flex' : 'hidden'} justify-center items-center `}>
          <div className="relative w-full max-w-[21rem] md:max-w-xl bg-black pt-12 pb-0 rounded-xl overflow-hidden">
            {stats != null ? (
              <>
              <button className='absolute top-3 right-3' onClick={closeModal}><BsX className='w-8 h-8 text-white'/></button>
            <div className="flex gap-7 items-center px-6 md:px-12">
              <Image src={urls.full} width={100} height={120} className='object-contain rounded-md' />
              <div className="flex flex-col gap-2">
                <h1 className='font-medium text-white text-2xl md:text-3xl capitalize'>Photo details</h1>
                <p className='text-[15px] text-gray-300'>Uploaded on: {truncatedDate}</p>
              </div>
            </div>

            <div className="flex gap-8 md:gap-12 items-center mt-4 px-6 md:px-12">
              <div className="flex flex-col gap-2">
                <p className='text-gray-300 text-[15px]'>Views</p>
                <h1 className='text-white font-medium text-xl md:text-2xl'>{truncatedViews}</h1>
              </div>
              <div className="flex flex-col gap-2">
                <p className='text-gray-300 text-[15px]'>Likes</p>
                <h1 className='text-white font-medium text-xl md:text-2xl'>{truncatedLikes}</h1>
              </div>
              <div className="flex flex-col gap-2">
                <p className='text-gray-400 font-medium text-[15px]'>Downloads</p>
                <h1 className='text-white font-normal text-xl md:text-2xl'>{truncatedDownload}</h1>
              </div>
            </div>
            <div className='w-full flex justify-center items-center p-6 md:p-12 mt-4 rounded-xl bg-white'>
              <div className="flex gap-8 md:gap-12 flex-col md:flex-row items-center justify-center">
              <div className="flex flex-col items-center md:items-start gap-2">
                <p className='text-gray-400 font-medium text-[15px]'>Dimension</p>
                <h1 className='text-black font-normal text-xl'>{width} x {height}</h1>
              </div>
              <div className="flex flex-col items-center md:items-start gap-2">
                <p className='text-gray-400 text-[15px]'>Color</p>
                <h1 className='text-black font-normal text-xl'>{color}</h1>
              </div>
              <div className="flex flex-col items-center md:items-start gap-2">
                <p className='text-gray-400 font-medium text-[15px]'>ID</p>
                <h1 className='text-black font-normal text-xl'>{id}</h1>
              </div>
            </div>
            </div>

              </>
            ) : (
              <>
              <button className='absolute top-3 right-3' onClick={closeModal}><BsX className='w-8 h-8 text-white'/></button>
            <div className="flex gap-7 items-center px-6 md:px-12 mb-4">
              <div className='w-[140px] h-[180px] rounded-md animate-pulse bg-gray-300'></div>
              <div className="flex flex-col gap-3">
                <div className="w-56 h-6 rounded-md animate-pulse bg-gray-300"></div>
                <div className="w-64 h-6 rounded-md animate-pulse bg-gray-300"></div>
              </div>
            </div>

            <div className='w-full flex flex-col items-center justify-center md:items-start md:justify-start gap-3 p-6 md:p-12 rounded-xl bg-white'>
              <div className="w-full flex flex-col md:flex-row items-center justify-between">
                <div className="w-22 h-10 md:w-32 w-22 md:h-20 rounded-md animate-pulse bg-gray-300"></div>
                <div className="w-22 h-10 md:w-32 w-22 md:h-20 rounded-md animate-pulse bg-gray-300"></div>
                <div className="w-22 h-10 md:w-32 w-22 md:h-20 rounded-md animate-pulse bg-gray-300"></div>
              </div>

              <div className="w-full hidden md:flex items-center justify-between">
                <div className="w-22 h-10 md:w-32 w-22 md:h-20 rounded-md animate-pulse bg-gray-300"></div>
                <div className="w-22 h-10 md:w-32 w-22 md:h-20 rounded-md animate-pulse bg-gray-300"></div>
                <div className="w-22 h-10 md:w-32 w-22 md:h-20 rounded-md animate-pulse bg-gray-300"></div>
              </div>
            </div>
              </>
            )}
          </div>
         
     </div>
    );
};
export default MoreInfo;