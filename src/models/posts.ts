import { Schema, model } from "mongoose";
import { PostsInterface } from "../interfaces/interfaces";

export enum OWNER {
    USER = 'User',
    BUSINESS = 'Business'
}
  
export const PostSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId, // It can be a User or a Business
        required: true,
        refPath: 'onModel' // This tells if it was a User or a Business who created the post
    },
    description: {
        type: String,
        required: true
    },
    onModel: {
        type: String,
        required: true,
        enum: [OWNER.USER, OWNER.BUSINESS]
    },
    sharable: {
        type: Boolean, // if others can share a post or not
        default: true
    },
    status: {
        type: Boolean,
        required: false,
        default: true,
    },
    addedAt: {
        type: Date,
        default: Date.now,
        required: false,
    },
    labels: [{
        type: String, // hashtags 
        required: false,
        unique: true
    }],
});
  
export const PostModel = model<PostsInterface>('Post', PostSchema);