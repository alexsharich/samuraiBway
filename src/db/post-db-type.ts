import {HydratedDocument, model, Model, Schema} from "mongoose";
import {InputPostType} from "../input-output-types/post-types";
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

    static createInstance({title, shortDescription, content, blogId, BlogName}: InputPostType & { BlogName: string }) {
        const post = new this()
        post.title = title
        post.shortDescription = shortDescription
        post.content = content
        post.blogId = blogId
        post.createdAt = new Date().toISOString()
        post.likesCount = 0
        post.dislikesCount = 0
        post.blogName = BlogName
        return post as PostDocument
    }
    public changeLikeStatus(newStatus:LikeStatus,status:LikeStatus){
        if(newStatus === status){
            return
        }
        if(newStatus === 'None' ){
            if(status === 'Like'){
                this.likesCount--
                return
            }
            if(status === 'Dislike'){
                this.dislikesCount--
                return
            }
        }
        if(newStatus === 'Like'){
            if(status === 'None'){
                this.likesCount++
                return
            }
            if(status === 'Dislike'){
                this.dislikesCount--
                return
            }
        }
    }
}

export type PostModelType = Model<PostEntity> & typeof PostEntity
export type PostDocument = HydratedDocument<PostEntity>

const PostSchema = new Schema<PostEntity>({
    title: {type: String, required: true},
    createdAt: {type: String, required: true},
    blogName: {type: String, required: true},
    blogId: {type: String, required: true},
    content: {type: String, required: true},
    shortDescription: {type: String, required: true},
    likesCount: {type: Number, required: true},
    dislikesCount: {type: Number, required: true}
})
PostSchema.loadClass(PostEntity)

export const PostModel = model<PostEntity, PostModelType>('posts', PostSchema)