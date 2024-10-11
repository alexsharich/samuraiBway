import {PostDBType} from "../db/post-db-type";
import {InputPostType} from "../input-output-types/post-types";
import {blogsRepository} from "./blogs-repository";
import {postsCllection} from "./DB";




export const postsRepository = {
    async findPost(id: string): Promise<PostDBType | null> {
        const post = await postsCllection.findOne({id: id})
        if (post) {
            return post
        } else {
            return null
        }
        //return DB.posts.find((post: PostDBType) => post.id === id)
    },
    async getPosts(): Promise<PostDBType[]> {
        return await postsCllection.find({}).toArray()
        //return DB.posts
    },
    async deletePost(id: string) {
        const result = await postsCllection.deleteOne({id: id})
        if (result.deletedCount === 1) {
            return true
        } else {
            return false
        }
        /* const postForDelete = DB.posts.find((post: PostDBType) => post.id === id)
         if (!postForDelete) {
             return false
         }
         DB.posts = DB.posts.filter((post: PostDBType) => post.id !== id)
         return true*/
    },
    async createPost(body: InputPostType): Promise<string | null> {
        const existBlog = await blogsRepository.findBlog( body.blogId )
        if(existBlog){
            const newPost = {
                id: new Date().toISOString() + Math.random(),
                title: body.title,
                shortDescription: body.shortDescription,
                content: body.content,
                blogId: body.blogId,
                blogName: existBlog.name,
            }
            const result = await postsCllection.insertOne(newPost)
            //DB.posts = [...DB.posts, newPost]
            return newPost.id
        }

    },
    async updatePost({params, body}: any): Promise<any> {
        const result = await postsCllection.updateOne({id: params}, {
            title: body.title,
            content: body.content,
            shortDescription: body.shortDescription,
            blogId: body.blogId
        })
        if(result.matchedCount ===1){
            return await postsCllection.findOne({id:params})
        }else{
            return null
        }
        /*const postForUpdate = DB.posts.find((post: PostDBType) => post.id === params)
        if (postForUpdate) {
            postForUpdate.title = body.title,
                postForUpdate.content = body.content,
                postForUpdate.shortDescription = body.shortDescription
            postForUpdate.blogId = body.blogId
            return postForUpdate
        }
        return null*/
    }

}