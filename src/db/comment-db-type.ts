import {HydratedDocument, model, Model, Schema} from "mongoose";



export type CommentDBType = {
    postId: string,
    content: string,
    commentatorInfo: CommentatorInfoType,
    createdAt: string
    likeInfo: {
        likeCount: number
        dislikeCount: number
    }
}
export type CommentatorInfoType = {
    userId: string,
    userLogin: string
}
export type LikeStatus = "None" | "Like" | "Dislike"

export type CommentModelType = Model<CommentDBType>
export type CommentDocument = HydratedDocument<CommentDBType>

const CommentatorInfoSchema = new Schema<CommentatorInfoType>({
    userId: {type: String, required: true},
    userLogin: {type: String, required: true}
})
const CommentSchema = new Schema<CommentDBType>({
    postId: {type: String, required: true},
    content: {type: String, required: true},
    commentatorInfo: {type: CommentatorInfoSchema, required: true},
    likeInfo: {
        likeCount: {type: Number, required: true, default: 0},
        dislikeCount: {type: Number, required: true, default: 0},
    }
},
    {timestamps:true})
export const CommentModel = model<CommentDBType, CommentModelType>('comment', CommentSchema)