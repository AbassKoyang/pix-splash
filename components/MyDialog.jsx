import React from 'react';
import { useSession } from 'next-auth/react';
import { motion, useAnimation } from 'framer-motion';
import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { BsArrowLeft, BsBookmarks, BsCheck2, BsFillInfoCircleFill, BsSave, BsX } from 'react-icons/bs';
import Image from 'next/image';
import Link from 'next/link';
import { BiArrowBack, BiBookmark, BiChevronDown, BiHeart, } from 'react-icons/bi';
import { AiFillCheckCircle } from 'react-icons/ai';
import { RiBookMarkLine, RiShareBoxFill } from 'react-icons/ri';
import { FaArrowLeft } from 'react-icons/fa';
import {toast, Toaster} from 'react-hot-toast';
import { fetchImageStats } from '@/utils';
import MoreInfo from './MoreInfo';
import SaveCollection from './SaveCollection';

const MyDialog = ({isOpen, closeModal, images}) => {

  const {data: session} = useSession();
  const {urls, links, user, id, color, likes, description, created_at, updated_at, width, height} = images;
  const [download, setDownload] = useState(urls.raw);
  const [downloadToggle, setDownloadToggle] = useState(false);
  const [active, setActive] = useState('original');
  const [moreInfoModal, setMoreInfoModal] = useState(false);
  const [submitting, setIsSubmitting] = useState(false);
  const [collectionModal, setCollectionModal] = useState(false);
  const [stats, setStats] = useState(null)
  const [isFetchingCollections, setIsFetchingCollections] = useState(false);
  const [collections, setCollections] = useState([]);
  

    // State to toggle animation
    const [isAnimating, setIsAnimating] = useState(false);

    // Framer Motion controls
    const controls = useAnimation();
  
    // Function to handle the button click
    const handleClick = async () => {
      setIsAnimating(true);
      await controls.start({ x: 0, opacity: 1 });
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
      toast.success("Your download has started.");
    } catch (error) {
      console.error('Download failed:', error);
      toast.error("Failed to download image, please try again.")
    }
  };


  const createCollection = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/collections/new', {
        method: "POST",
        body: JSON.stringify({
          title: "Test collection",
          collectionDescription: "Test collection description.",
          content: [{urls, links, user, id, color, likes, description, created_at, updated_at, width, height}],
          userId: session?.user.id,
        })
      })

      if(response.ok){
        toast.success('Collection created successfully!')
      }
      if(!response.ok){
        toast.error('Could not create collection.')
      }
    } catch (error) {
      console.log(error);
    }finally{
      setIsSubmitting(false)
    }
  };


  const handleCollectionModal = () => {
    if(session){
      setCollectionModal(false)
    } else {
      toast.error('You must be logged in to create collections.', {
        icon: '⛔'
      })
    }
  };

  const fetchCollections = async () => {
    setIsFetchingCollections(true)
    try {
      await connectToDB();
      const response = await fetch(`api/users/${session?.user.id}/collections`);
      const collections = response.json();
      setCollections(collections);
    } catch (error) {
      console.log(error);
    }finally{
      setIsFetchingCollections(false)
    }
  };

  
  const handleMoreInfo = async () => {
    const imageStats = await fetchImageStats(id);
    if(imageStats){
      setStats(imageStats);
    } else {
      toast.error("Failed to fetch image statistics.")
    }
    console.log(stats)
  };

  return (
    // Use the `Transition` component at the root level
    <Transition show={isOpen} as={Fragment}>
      <Dialog as='div' className="relative z-30 w-screen h-screen"  onClose={closeModal}>
        {/*
          Use one Transition.Child to apply one transition to the backdrop...
        */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        {/*
          ...and another Transition.Child to apply a separate transition
          to the contents.
        */}
        <div className="fixed w-full h-full inset-0 overflow-y-auto">
        <div className="w-full flex min-h-full items-center justify-center text-center">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="relative w-full h-[100vh] lg:max-w-5xl lg:max-h-[95vh] overflow-y-auto overflow-hidden transform rounded-none lg:rounded-2xl bg-white p-3 lg:p-6 text-left shadow-xl transition-all flex flex-col gap-5">

            {/* Nav */}

            <div className="w-full flex justify-between items-center mt-2 lg:mt-0 sticky top-0">
                <div className="flex gap-2 items-center">
                  <button onClick={closeModal} className='rounded-full outline-none border-none stroke-none'><BiArrowBack className='w-5 h-5 md:w-8 md:h-8'/></button>

                  <div className="flex items-center justify-center gap-3">
                    <Link href='/' className=''><img src={user.profile_image.small} className='w-11 h-11 md:w-16 md:h-16 rounded-full object-contain'></img></Link>

                    <div className="flex flex-col">
                      <p className='text-sm md:text-xl font-bold capitalize text-black'>{user.name}</p>
                      <Link href='/'><p className='text-[12px] md:text-lg font-medium capitalize text-gray-600'>@{user.username}</p></Link>
                    </div>
                  </div>
               </div>

              <div className="flex gap-2 md:gap-4">
                <button 
                className="block lg:hidden px-3 py-0 rounded-full md:rounded-none bg-transparent border border-gray-300 hover:border-black transition-all duration-300"
                onClick={()=> setCollectionModal(true)}>
                  <BiHeart className='w-4 h-4 md:w-5 md:h-5'/>
                </button>

                <button 
                className="block md:flex px-3 py-0 md:px-3 md:py-1 rounded-full md:rounded-none bg-transparent border border-gray-300 hover:border-black transition-all duration-300 md:gap-2 md:items-center"
                onClick={()=> {setCollectionModal(true), fetchCollections()}}>
                  <BiBookmark className='w-4 h-4 md:w-5 md:h-5 leading-[0px] m-0 p-0'/>
                  <p className='hidden md:block text-lg text-gray-900 font-medium'>Save</p>
                </button>

                <button className="hidden lg:flex px-3 py-1 bg-transparent border border-gray-300 hover:border-black transition-all duration-300 gap-2 items-center">
                  <p className='text-lg text-gray-900'> <span className='text-black font-medium'>{likes}</span> Likes</p>
                </button>

                <div className="flex items-center w-[40px] lg:w-[220px] h-[40px] lg:h-10 rounded-md lg:rounded-none relative">
                <button className="h-full hidden md:block bg-black/90 hover:bg-black text-white text-lg w-[75%]" onClick={() => {handleDownloadImage(urls.small, description)}}>
                  Free Download
                </button>
                <button className="h-full bg-black/90  hover:bg-black w-[100%] md:w-[25%] flex items-center justify-center rounded-full lg:rounded-none" onClick={() => {setDownloadToggle(!downloadToggle), handleClick}}>
                  <BiChevronDown className={`text-white w-7 h-7 transition-all duration-300 ${downloadToggle ? 'rotate-180' : 'rotate-0'}`} />
                </button>

                {/* Dowmload select box */}

                {downloadToggle ? (
                <motion.div 
                  initial={{ x: '100%', opacity: 0 }}
                  animate={isAnimating ? controls : { x: '0', opacity: 1 }}
                  transition={{ duration: 0.7 }}
                className="absolute w-[250px] top-14 right-0 bg-white shadow-lg p-2"
                >
                <p className='text-gray-900 font-medium p-2'>Choose a size</p>
                  <button className="w-full p-2 text-lg font-medium text-left flex items-center justify-between" onClick={() => {setActive('original'), setDownload(urls.raw)}}>
                    Original
                    <BsCheck2 className={`w-6 h-6 ${active === 'original' ? 'block' : 'hidden'}`} />
                  </button>
                  <button className="w-full p-2 text-lg font-medium text-left flex items-center justify-between" onClick={() => {setActive('large'), setDownload(urls.full)}}>
                    Large
                    <BsCheck2 className={`w-6 h-6 ${active === 'large' ? 'block' : 'hidden'}`} />
                  </button>
                  <button className="w-full p-2 text-lg font-medium text-left flex items-center justify-between" onClick={() => {setActive('medium'), setDownload(urls.regular)}}>
                    Medium
                    <BsCheck2 className={`w-6 h-6 ${active === 'medium' ? 'block' : 'hidden'}`} />
                  </button>
                  <button className="w-full p-2 text-lg font-medium text-left flex items-center justify-between" onClick={() => {setActive('small'), setDownload(urls.small)}}>
                    Small
                    <BsCheck2 className={`w-6 h-6 ${active === 'small' ? 'block' : 'hidden'}`} />
                  </button>
                  <button className="w-full p-3 text-lg font-medium text-white text-left bg-black/90 hover:bg-black" onClick={() => {handleDownloadImage(download, description)}}>
                    Download Selected Size
                  </button>
              </motion.div>
              ) : (
                <div></div>
              )}
                </div>
              </div>
            </div>

            {/* Image */}

            <div className="w-full h-[80%] overflow-y-scroll object-fill flex flex-col items-start justify-center">
              <img src={urls.full} className='w-full' />
            </div>

            <h1 className='text-gray-800 text-lg font-medium text-left mt-2'>{description}</h1>

            <div className="w-full flex justify-between items-center my-2">
              <button className='hidden md:flex items-center gap-1 text-gray-600 bg-transparent'><AiFillCheckCircle className='text-gray-600'/>Free to use</button>

              <div className="flex items-center gap-3">
              <button className="px-3 py-1 bg-transparent border border-gray-300 hover:border-black transition-all duration-300 flex gap-2 items-center" onClick={() => {setMoreInfoModal((prev)=> !prev), handleMoreInfo();}}>
                <BsFillInfoCircleFill className='text-gray-600'/>
                <p className='text-sm lg:text-lg text-black font-medium'>More Info</p>
              </button>

              <button className="px-3 py-1 bg-transparent border border-gray-300 hover:border-black transition-all duration-300 flex gap-2 items-center">
                <RiShareBoxFill className='text-gray-600'/>
                <p className='text-sm lg:text-lg text-black font-medium'>Share</p>
              </button>
            </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
        </div>
        <SaveCollection isOpen={collectionModal} createCollection={createCollection} setCollectionModal={handleCollectionModal} collections={collections}/>
        <MoreInfo isOpen={moreInfoModal} image={images} stats={stats} closeModal={()=> setMoreInfoModal(false)} />
        </div>
      </Dialog>
    </Transition>
  )
}
export default MyDialog