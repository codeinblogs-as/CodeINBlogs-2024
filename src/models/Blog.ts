// models/Post.ts
import mongoose, { Document, Model, Schema } from 'mongoose'

const commentSchema = new Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
export interface IPost extends Document {
  title: string
  subtitle?: string
  tags: string[]
  coverImage?: string
  content: string
  userId: mongoose.Schema.Types.ObjectId
  likes:number,
  comments:[commentSchema]
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  tags: { type: [String], required: true },
  coverImage: { type: String },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  likes:{type:Number,default:0},
  comments:{
    type:[commentSchema]
  }

},
{timestamps:true})

export const Post: Model<IPost> = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema)
