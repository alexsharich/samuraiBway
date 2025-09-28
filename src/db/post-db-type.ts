import {HydratedDocument, model, Model, Schema} from "mongoose";
import {LikeStatus} from "./comment-db-type";

export type PostDBType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
    createdAt: string
}


export class PostEntity {
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
    likesCount: number
    dislikesCount: number

    constructor(title: string,
                shortDescription: string,
                content: string,
                blogId: string,
                blogName: string,
                createdAt: string,
                likesCount: number,
                dislikesCount: number
    ) {
        this.blogId = blogId
        this.content = content
        this.blogName = blogName
        this.title = title
        this.createdAt = createdAt
        this.shortDescription = shortDescription
        this.likesCount = likesCount
        this.dislikesCount = dislikesCount
    }

    public changeLikeStatus(newStatus: LikeStatus, status: LikeStatus) {
        if (newStatus === status) {
            return
        }
        if (newStatus === 'None') {
            if (status === 'Like') {
                this.likesCount > 0 && this.likesCount--
                return
            }
            if (status === 'Dislike') {
                this.dislikesCount > 0 && this.dislikesCount--
                return
            }
        }
        if (newStatus === 'Like') {

            if (status === 'Dislike') {
                this.dislikesCount > 0 && this.dislikesCount--
            }
            this.likesCount++
            return
        }
        if (newStatus === 'Dislike') {

            if (status === 'Like') {
                this.likesCount > 0 && this.likesCount--
            }
            this.dislikesCount++
            return
        }

    }
}

export type PostModelType = Model<PostEntity>
export type PostDocument = HydratedDocument<PostEntity>

const PostSchema = new Schema<PostEntity>({
        title: {type: String, required: true},
        blogName: {type: String, required: true},
        blogId: {type: String, required: true},
        content: {type: String, required: true},
        shortDescription: {type: String, required: true},
        likesCount: {type: Number, default: 0},
        dislikesCount: {type: Number, default: 0},
    },
    {versionKey: false, timestamps: true}
)

PostSchema.loadClass(PostEntity)

export const PostModel = model<PostEntity, PostModelType>('posts', PostSchema)



