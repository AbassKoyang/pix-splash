import React from 'react'
import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { BsBookmarks, BsCheck2, BsSave, BsX } from 'react-icons/bs';
import Image from 'next/image';
import Link from 'next/link';
import { BiChevronDown } from 'react-icons/bi';

const MyDialog = ({isOpen, closeModal, images}) => {

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

  const {urls, links, user, id, color, likes, description, created_at, updated_at, width, height} = images;
  const [download, setDownload] = useState(urls.raw);
  const [downloadToggle, setDownloadToggle] = useState(false);
  const [active, setActive] = useState('original')
  return (
    // Use the `Transition` component at the root level
    <Transition show={isOpen} as={Fragment}>
      <Dialog as='div' className="relative z-30"  onClose={closeModal}>
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
        <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
            <button onClick={closeModal} className='absolute top-2 right-2 p-2 bg-gray-200 rounded-full outline-none border-none stroke-none'><BsX className='w-6 h-6'/></button>
            <div className="w-full flex justify-between items-center mt-8">
              <div className="flex items-center justify-center gap-3">
              <Link href='/' className='object-contain'><img src={user.profile_image.small} className='w-12 h-12 rounded-full object-contain'></img></Link>

              <div className="flex flex-col gap-1">
                <p className='text-xl font-bold capitalize text-black'>{user.name}</p>
                <Link href='/'><p className='text-lg font-medium capitalize text-gray-600'>{user.username}</p></Link>
              </div>
              </div>

              <div className="flex gap-4">
                <button className="px-3 py-1 bg-transparent border border-black flex gap-2 items-center">
                  <BsBookmarks/>
                  <p className='text-lg text-gray-900'>Save</p>
                </button>

                <div className="flex items-center w-[220px] h-10 relative">
                <button className="h-full bg-black/95 hover:bg-black text-white text-lg w-[75%]" onClick={() => {handleDownloadImage(urls.small, description)}}>
                  Free Download
                </button>
                <button className="h-full bg-black/95  hover:bg-black w-[25%] flex items-center justify-center" onClick={() => {setDownloadToggle(!downloadToggle)}}>
                  <BiChevronDown className={`text-white w-7 h-7 transition-all duration-300 ${downloadToggle ? 'rotate-180' : 'rotate-0'}`} />
                </button>

                {downloadToggle ? (
                <div className="absolute w-[250px] top-14 right-0 bg-white shadow-lg p-2">
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
                  <button className="w-full p-3 text-lg font-medium text-white text-left bg-black" onClick={() => {handleDownloadImage(download, description)}}>
                    Download Selected Size
                  </button>
              </div>
              ) : (
                <div></div>
              )}
                </div>
              </div>
            </div>

            <div className="w-full flex items-center justify-center">
              <img src={urls.full} className='w-[400px'/>
            </div>
            {/* ... */}
          </Dialog.Panel>
        </Transition.Child>
        </div>
        </div>
      </Dialog>
    </Transition>
  )
}
export default MyDialog