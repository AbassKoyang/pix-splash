import React from 'react';
import { BsX } from 'react-icons/bs';
import { useState } from 'react';
import Image from 'next/image';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

const SaveCollection = ({isOpen, setCollectionModal, collections, isFetchingCollections}) => {
const [isCreateCollectionOpen, setIsCreateCollectionOpen] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const {data:session} = useSession();
const [collectionTitle, setCollectionTitle] = useState(null);
const [collectionDesc, setCollectionDesc] = useState(null);

const createCollection = async () => {
  setIsSubmitting(true);

  try {
    const response = await fetch('/api/collections/new', {
      method: "POST",
      body: JSON.stringify({
        authorName: session?.user.name,
        title: collectionTitle,
        collectionDescription: collectionDesc,
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

  return (
    <div className={`fixed w-[100vw] h-[100vh] top-0 left-0 bg-black/25 z-70 ${isOpen? 'flex' : 'hidden'} justify-center items-center overflow-hidden`}>
          <div className={`relative w-full max-w-[22rem] md:max-w-2xl bg-white rounded-lg px-6 py-8 md:p-16 flex justify-center items-center`}>
          <button 
          className='absolute top-2 right-2 p-2 bg-transparent rounded-full outline-none border-none stroke-none'
          onClick={setCollectionModal}
          ><BsX className='w-6 h-6'/>
          </button>
          <div className={`w-full h-full ${!isCreateCollectionOpen? 'flex' : 'hidden'} flex-col justify-center items-start`}>
            <h1 className='text-xl text-gray-800 font-medium mb-5'>Add this Shot to a collection</h1>
            <input type="text" placeholder='filter collections' className='w-full p-4 rounded-xl text-gray-200 outline-0 focus:shadow-red-200 focus:shadow-sm bg-white border-[1.5px] border-[#e7e7e9] mb-4 md:mb-2' />
            <div className={`w-full h-[220px] flex flex-col ${isFetchingCollections ? 'justify-center items-center' : ''} gap-2 overflow-y-scroll`}>
              {isFetchingCollections ? (
                <div className='flex items-center gap-1'>
                  <p className='text-[15px] text-[#0d0c22] font-semibold'>Loading collections...</p> <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin"/>
                </div>
              ) : (
                
                  collections.map((collection) =>{
                    const {id, title, collectionDescription, content, createdAt} = collection;
                    const {urls, links, user, color, likes, description, created_at, updated_at, width, height} = content[content.length - 1];
                     return (
                      <button key={id} className='p-2 md:p-3 w-full flex gap-3 items-center rounded-md outline-0 border-[1.5px] border-[#e7e7e9] hover:shadow-red-200 hover:shadow-sm focus:shadow-red-200 focus:shadow-sm'>
                      <Image src={urls.small} width={50} height={50} className='rounded-md'/>                      
                      <div className="flex flex-col gap-1 items-start">
                      <p className='text-[15px] text-[#0d0c22] font-semibold'>{title}</p>
                      <p className='text-[13px] text-[#6e6d7a] font-normal'>{content.length} shot</p>
                      </div>
                      </button>
                      )
                    })
              )}
            </div>
            <div className="w-full flex justify-between items-center mt-5">
              <button
              onClick={()=> setIsCreateCollectionOpen(true)}
              className='px-3 py-2 text-[11px] md:text-[13px] text-[#0d0c22] border-[1px] border-[#e7e7e9] rounded-full bg-transparent hover:bg-black hover:text-white font-medium transition-all duration-300'>
                Create a new collection
              </button>
              <button onClick={setCollectionModal} className='px-3 py-2 text-[11px] md:text-[13px] md:px-3 md:py-2 rounded-full bg-black text-white font-medium'
              >
                Done
              </button>
              </div>
            </div>

          {/* Create collection section 
          Create collection section 
          Create collection section */}

           <div className={`w-full h-full ${isCreateCollectionOpen? 'flex' : 'hidden'} flex-col justify-center`}>
              <h1 className='text-lg md:text-xl font-medium mb-5 pb-3 border-b-[0.5px] border-gray-300 text-gray-800'>Create a new collection</h1>
              <label htmlFor="name" className='text-sm md:text-[16px] font-medium text-gray-600'>Name</label>
              <input 
              name='name' 
              type="text" 
              className='w-full p-5 rounded-lg text-gray-600 bg-white border-[1.5px] border-[#e7e7e9] mb-2 focus:shadow-red-200 focus:shadow-sm' 
              onChange={(e) => setCollectionTitle(e.target.value)}
              />
              <label htmlFor="description" className='mt-3 text-sm md:text-[16px] font-medium text-gray-600'>Description (Optional)</label>
              <textarea 
              rows='3' 
              name='description' 
              type="text" 
              className='w-full p-5 rounded-lg text-gray-600 border-[1.5px] border-[#e7e7e9] mb-2 focus:shadow-red-200 focus:shadow-sm' 
              onChange={(e) => setCollectionDesc(e.currentTarget.value)}
              />
              <div className="w-full flex justify-start gap-3 items-center mt-5">
              { !isSubmitting ? (
                <button 
                className='px-3 py-2 text-[11px] md:text-[13px] rounded-full bg-black text-white font-medium hover:opacity-80 transition-all duration-300'
                onClick={()=> createCollection()}
                >
                  Create new collection
                </button>
              ) : (
                <button 
              className='px-3 py-2 text-[11px] md:text-[13px] rounded-full bg-black/20 text-white font-medium hover:opacity-80 transition-all duration-300 flex items-center justify-center gap-2'
              >
                Creating collection <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin"/>
              </button>
              )}
              <button
              onClick={()=> setIsCreateCollectionOpen(false)}
               className='px-3 py-2 text-[11px] md:text-[13px] rounded-full bg-gray-200 text-[#0d0c22] font-medium'>
                Cancel
              </button>
            </div>
           </div>
          </div>
        </div>
  )
}

export default SaveCollection