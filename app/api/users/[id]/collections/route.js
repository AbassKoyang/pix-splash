import Collection from "@/models/collection";
import { connectToDB } from "@/utils/database";

export const GET = async (request, {params}) => {
    try {
        await connectToDB();

        const collections = await Collection.find({
            author: params.id,
        }).populate('author');

        return new Response(JSON.stringify(collections), {status: 200})

    } catch (error) {
        return new Response("Failed to fetch collections", { status: 500 })
    }
}