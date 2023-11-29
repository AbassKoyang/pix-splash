import Favourite from "@/models/favourites";
import { connectToDB } from "@/utils/database";

export const GET = async (request, {params}) => {
    try {
        await connectToDB();

        const favourites = await Favourite.find({
            creator: params.id
        }).populate('creator');

        return new Response(JSON.stringify(favourites), {status: 200})

    } catch (error) {
        return new Response("Failed to fetch favourites", { status: 500 })
    }
}