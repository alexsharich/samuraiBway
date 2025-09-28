import {LikeStatus} from "./comment-db-type";
import {HydratedDocument, model, Model, Schema} from "mongoose";

export type LikePostType = {
    postId: string
    userId: string
    myStatus: LikeStatus
    login: string
    createdAt: string
}

export type LikePostModelType = Model<LikePostType>
export type LikePostDocument = HydratedDocument<LikePostType>

const LikeSchema = new Schema<LikePostType>({
        postId: {type: String, required: true},
        userId: {type: String, require: true},
        myStatus: {type: String, required: true},
        login: {type: String, required: true}
    },
    {versionKey: false, timestamps: true})

export const LikePostModel = model<LikePostType, LikePostModelType>('postLike', LikeSchema)