import { connectToDB } from "@/utils/database";
import Favourite from "@/models/favourites";

export const DELETE = async (request, {params}) => {
    try {
        await connectToDB();

        await Favourite.findByIdAndDelete(params.id);
        return new Response('Image deleted from favourites succesfully',{status: 200})
    } catch (error) {
        console.log('Error deleting image from favourites', error);
        return new Response("Error deleting image from favourites", { status: 500 });
    }
}