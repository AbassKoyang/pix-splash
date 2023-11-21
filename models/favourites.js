import { Schema, model, models } from "mongoose";

const FavouriteSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: Object,
        required: [true, 'Content is required!'],
    }
})

const Favourite = models.Favourite  || model('Favourite', FavouriteSchema);
export default Favourite;