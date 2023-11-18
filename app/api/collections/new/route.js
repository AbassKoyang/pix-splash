import Collection from "@/models/collection";
import { connectToDB } from "@/utils/database";


export const POST = async (request) => {
    const {title, content, description, userId, createdAt} = await request.json();

    try {
        await connectToDB();
        const newCollection = new Collection({author: userId, title, content, description, createdAt});
        await newCollection.save();
        return new Response(JSON.stringify(newCollection), {status: 201})
    } catch (error) {
        return new Response("Failed to create a new collection", { status: 500 });
    }
}
