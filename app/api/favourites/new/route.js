import { connectToDB } from "@/utils/database";
import Favourite from "@/models/favourites";
import toast from "react-hot-toast";

export const POST = async (request) => {
    const {
        _id,
        userId,
        id,
        created_at,
        updated_at,
        width,
        height,
        color,
        likes,
        description,
        user,
        current_user_collections,
        urls,
        links,
      } = await request.json();

    const favouriteExists = await Favourite.findOne({id: id})
    if(!favouriteExists){
        try {
            console.log(_id);
            await connectToDB();
            const newFavourite = new Favourite({creator: userId, id, created_at, updated_at, width, height, color, likes, description, user, current_user_collections, urls, links,});
            await newFavourite.save();
            return new Response(JSON.stringify(newFavourite), {status: 201});
        } catch (error) {
            console.error('Error adding image to favourites:', error);
            return new Response('Failed to add image to favourites', {status: 500});
        }
    } else {
        return new Response('Image has already been added to favourites', {status: 208});
    }

}