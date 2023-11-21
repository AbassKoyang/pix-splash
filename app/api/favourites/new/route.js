import { connectToDB } from "@/utils/database";
import Favourite from "@/models/favourites";

export const POST = async (request) => {
    const {content} = await request.json();

    try {
        await connectToDB();
        const newFavourite = new Favourite({creator: content});
        await newFavourite.save();
        return new Response(JSON.stringify(newFavourite), {status: 201});
    } catch (error) {
        return new Response('Failed to add image to favourites', {status: 500});
    }

};