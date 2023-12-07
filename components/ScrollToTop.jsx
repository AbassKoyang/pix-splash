"use client"
import React, { useEffect, useState } from 'react';

const ScrollToTop = () => {
    const [scrollButton, setScrollButton] = useState(false)

useEffect(() => {
    const handleScrollToTopButtonVisibility = () => {
    if (window.scrollY > 50) {
            setScrollButton(true)
       } else{
        setScrollButton(false)
       }
    }
       window.addEventListener('scroll', handleScrollToTopButtonVisibility);
       handleScrollToTopButtonVisibility();
       return () => {
         window.removeEventListener('scroll', handleScrollToTopButtonVisibility);
       }
}, [])


const handleScrollToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
}

  return (
    <button aria-label='scroll to top button' onClick={handleScrollToTop} className={`${scrollButton ? 'block' : 'hidden'} fixed right-5 bottom-8 z-20  p-2 md:p-2 bg-gray-600 hover:bg-black active:bg-black focus:bg-black rounded-full opacity-70`}>
        <svg aria-hidden={true} className='w-6 h-6 md:w-6 md:h-6 text-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.9999 7.82843V20H10.9999V7.82843L5.63589 13.1924L4.22168 11.7782L11.9999 4L19.778 11.7782L18.3638 13.1924L12.9999 7.82843Z" fill="rgba(255,255,255,1)"></path></svg>
    </button>
  )
}

export default ScrollToTop