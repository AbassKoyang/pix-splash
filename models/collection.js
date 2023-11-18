import {Schema, SchemaTypes, model, models} from 'mongoose';


const CollectionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  content: {
    type: Object,
    required: true,
  },
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
