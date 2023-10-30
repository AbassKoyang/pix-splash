import React, {useState, Fragment} from 'react';
import { Dialog, Transition } from '@headlessui/react';

const MoreInfo = ({isOpen, image, closeModal}) => {
    const {urls, links, user, id, color, likes, description, created_at, updated_at, width, height} = image;

    return (
       <div className={`w-full ${isOpen ? 'flex' : 'hidden'} flex-col lg:flex-row gap-2 lg:gap-[10%]`}>
         <div className={`w-full lg:w-[45%] gap-2 flex-col flex items-center justify-between`}> 
            <div className="w-full flex items-center justify-between">
                <h1 className='text-lg font-bold text-black'>Uploaded by:</h1>
                <p className='text-lg font-medium text-gray-700'>{user.name}</p>
            </div>
            <div className="w-full flex items-center justify-between">
                <h1 className='text-lg font-bold text-black'>Description:</h1>
                <p className='text-lg font-medium text-gray-700'>{description}</p>
            </div>
            <div className="w-full flex items-center justify-between">
                <h1 className='text-lg font-bold text-black'>Width:</h1>
                <p className='text-lg font-medium text-gray-700'>{width}</p>
            </div>
            <div className="w-full flex items-center justify-between">
                <h1 className='text-lg font-bold text-black'>Height:</h1>
                <p className='text-lg font-medium text-gray-700'>{height}</p>
            </div>
         </div>

        <div className={`w-full lg:w-[45%] gap-2 flex-col flex items-center justify-between`}>
             <div className="w-full flex items-center justify-between">
                <h1 className='text-lg font-bold text-black'>Color:</h1>
                <p className='text-lg font-medium text-gray-700'>{color}</p>
            </div>
            <div className="w-full flex items-center justify-between">
                <h1 className='text-lg font-bold text-black'>No. of likes:</h1>
                <p className='text-lg font-medium text-gray-700'>{likes}</p>
            </div>
            <div className="w-full flex items-center justify-between">
                <h1 className='text-lg font-bold text-black'>Created at:</h1>
                <p className='text-lg font-medium text-gray-700'>{created_at}</p>
            </div>
            <div className="w-full flex items-center justify-between">
                <h1 className='text-lg font-bold text-black'>Updated at:</h1>
                <p className='text-lg font-medium text-gray-700'>{updated_at}</p>
            </div>
       </div>
     </div>
    );
}

export default MoreInfo