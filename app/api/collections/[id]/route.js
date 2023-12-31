import { connectToDB } from "@/utils/database";
import Collection from "@/models/collection";

export const PATCH = async (request, {params}) => {
    try {
        await connectToDB();
        console.log('Request body:', request.body);
        const newImage = request.body.imageProperties;
        const updatedCollection = await Collection.findByIdAndUpdate(
                params.id,
            {
                $push: {
                content: newImage,
                },
            },
            { new: true }
       );
       if (updatedCollection) {
        console.log('Image added to collection succesfully:', updatedCollection);
        return new Response('Image added to collection succesfully:', { status: 200 });
      } else {
        console.log('Collection not found or not updated.');
        return new Response('Collection not found or not updated.', { status: 404 });
      }
    } catch (error) {
        console.log('Error adding image to colection', error);
        return new Response("Error adding image to colection", { status: 500 });
    }
}

export const GET = async (request, {params}) => {
  const _id = params.id
  try {
    await connectToDB();
   const collection = await Collection.findOne({_id:_id});
   return new Response(JSON.stringify(collection), {status: 200});
  } catch (error) {
    return new Response('Failed to fetch collection', {status: 500});
  }
};

export const DELETE = async (request, {params}) => {
    try {
        await connectToDB();
        await Collection.findByIdAndDelete(params.id);
        return new Response('Collection deleted from succesfully', {status: 200})
    } catch (error) {
      console.log(error)
        return new Response("Error deleting collection", { status: 500 });
    } 
}