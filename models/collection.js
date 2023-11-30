import {Schema, SchemaTypes, model, models} from 'mongoose';


const CollectionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  collectionDescription: {
    type: String,
    required: true,
  },
  content: [
    {
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
    }
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Collection = models.Collection || model('Collection', CollectionSchema);

export default Collection;
