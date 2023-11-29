import { Schema, model, models } from "mongoose";

const FavouriteSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    id: String,
    created_at: String,
    updated_at: String,
    width: Number,
    height: Number,
    color: String,
    blur_hash: String,
    likes: Number,
    liked_by_user: Boolean,
    description: String,
    user:{
        id: String,
        username: String,
        name: String,
        portfolio_url: String,
        bio: String,
        location: String,
        total_likes: Number,
        total_photos: Number,
        total_collections: Number,
        instagram_username: String,
        twitter_username: String,
        profile_image: {
            small: String,
            medium: String,
            large: String,
        },
        links: {
            self: String,
            html: String,
            photos: String,
            likes: String,
            portfolio: String,
        },
    },
    current_user_collections:[{
        id: Number,
        title: String,
        published_at: String,
        last_collected_at: String,
        updated_at: String,
        cover_photo: Schema.Types.Mixed,
        user: Schema.Types.Mixed,
    }],
    urls:{
        raw: String,
        full: String,
        regular: String,
        small: String,
        thumb: String,
    },
    links: {
        self: String,
        html: String,
        download: String,
        download_location: String,
      },
})

const Favourite = models.Favourite  || model('Favourite', FavouriteSchema);
export default Favourite;