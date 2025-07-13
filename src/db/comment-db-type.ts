import {HydratedDocument, model, Model, Schema} from "mongoose";

export type CommentDBType = {
    postId: string,
    content: string,
    commentatorInfo: CommentatorInfoType,
    createdAt: string
}
export type CommentatorInfoType = {
    userId: string,
    userLogin: string
}


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
    createdAt: {type: String, required: true}
})
export const CommentModel = model<CommentDBType, CommentModelType>('comment', CommentSchema)