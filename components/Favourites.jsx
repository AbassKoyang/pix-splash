import React from 'react'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
const Favourites = () => {
    const {data:session} = useSession();
    const [favouritePosts, setFavouritePosts] = useState([])


      const fetchFavourites = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/favourites`);
        const favourites = await response.json();
        setFavouritePosts(favourites)
        console.log(favourites);
        console.log('working')
      }
      const test = () => {
        if(session?.user.id){
          fetchFavourites();
        }
      }
    
  return (
    <section className="bg-white col-span-4  columns-2 md:columns-3 lg:columns-5 pt-4 lg:px-6">
        {
            favouritePosts.map((favouritePost) => (
                <div className="mb-4 rounded-xl overflow-hidden">
                    <img src={favouritePost.urls.small} alt={favouritePost.description} className='w-full h-full' />
                </div>
            ))
        }
        <p>fave</p>
        <p>fave</p>
        <p>fave</p>
        <p>fave</p>
        <button onClick={()=> test()}>click</button>
    </section>
  )
}

export default Favourites