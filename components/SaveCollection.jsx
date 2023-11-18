import React from 'react';
import { BsX } from 'react-icons/bs';
import { useState } from 'react';

const SaveCollection = ({isOpen}) => {
const [isCreateCollectionOpen, setIsCreateCollectionOpen] = useState(false);

  return (
    <div className={`fixed w-[100vw] h-[100vh] top-0 left-0 bg-black/25 z-70 ${isOpen? 'flex' : 'hidden'} justify-center items-center overflow-hidden`}>
          <div className={`relative w-full h-[85vh] max-w-2xl bg-white rounded-lg p-16 flex justify-center items-center`}>
          <button 
          className='absolute top-2 right-2 p-2 bg-transparent rounded-full outline-none border-none stroke-none hidden lg:block'
          onClick={()=> setCollectionModal(false)}
          ><BsX className='w-6 h-6'/>
          </button>
          <div className={`w-full h-full ${!isCreateCollectionOpen? 'flex' : 'hidden'} flex-col justify-center items-start`}>
            <h1 className='text-xl text-gray-800 font-medium mb-5'>Add this Shot to a collection</h1>
            <input type="text" placeholder='filter collections' className='w-full p-4 rounded-lg text-gray-600 bg-white border border-black mb-2' />
            <div className="w-full h-[280px] flex flex-col gap-2 overflow-y-scroll">
              <div className="p-8 w-full rounded-md border border-gray-700">
                <p>nkjnuhydsy</p>
              </div>
              <div className="p-8 w-full rounded-md border border-gray-700">
                <p>nkjnuhydsy</p>
              </div>
              <div className="p-8 w-full rounded-md border border-gray-700">
                <p>nkjnuhydsy</p>
              </div>
              <div className="p-8 w-full rounded-md border border-gray-700">
                <p>nkjnuhydsy</p>
              </div>
            </div>
            <div className="w-full flex justify-between items-center mt-5">
              <button
              onClick={()=> setIsCreateCollectionOpen(true)}
              className='px-4 py-2 border-[0.5px] border-black rounded-full bg-transparent hover:bg-black hover:text-white font-medium transition-all duration-300'>
                Create a new collection
              </button>
              <button className='px-5 py-3 rounded-full bg-black text-white font-medium'>
                Done
              </button>
              </div>
            </div>

          {/* Create collection section 
          Create collection section 
          Create collection section  */}

           <div className={`w-full h-full ${isCreateCollectionOpen? 'flex' : 'hidden'} flex-col justify-center`}>
              <h1 className='text-xl font-medium mb-5 pb-3 border-b-[0.5px] border-gray-300 text-gray-800'>Create a new collection</h1>
              <label htmlFor="name" className='text-lg font-medium text-gray-600'>Name</label>
              <input name='name' type="text" className='w-full p-5 rounded-lg text-gray-600 bg-white border border-black mb-2 focus:shadow-xl' />
              <label htmlFor="description" className='mt-3 text-lg font-medium text-gray-600'>Description (Optional)</label>
              <textarea rows='3' name='description' type="text" className='w-full p-5 rounded-lg text-gray-600 bg-white border border-black mb-2 focus:shadow-xl' />
              <div className="w-full flex justify-start gap-3 items-center mt-5">
              <button className='px-4 py-2 rounded-full bg-black text-white font-medium hover:opacity-80 transition-all duration-300'>
                Create new collection
              </button>
              <button
              onClick={()=> setIsCreateCollectionOpen(false)}
               className='px-4 py-2 rounded-ful bg-gray-200 text-black font-medium'>
                Cancel
              </button>
            </div>
           </div>
          </div>
        </div>
  )
}

export default SaveCollection