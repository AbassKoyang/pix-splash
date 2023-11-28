import { connectToDB } from "@/utils/database";
import Favourite from "@/models/favourites";

export const POST = async (request) => {
    const {
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

    try {
        await connectToDB();
        const newFavourite = new Favourite({creator: id, created_at, updated_at, width, height, color, likes, description, user, current_user_collections, urls, links,});
        await newFavourite.save();
        return new Response(JSON.stringify(newFavourite), {status: 201});
    } catch (error) {
        return new Response('Failed to add image to favourites', {status: 500});
    }

};