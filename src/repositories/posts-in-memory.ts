import {PostDBType} from "../db/post-db-type";
import {DB} from "../db/db";
import {InputPostType} from "../input-output-types/post-types";
import {blogsRepository} from "./blogs-repository";
import {BlogDBType} from "../db/blog-db-type";
import {postsCollection} from "./DB";


export const postsRepository = {
    async findPost(id: string | null): Promise<PostDBType | null> {
        return DB.posts.find((post: PostDBType) => post.id === id)
    },
    async getPosts():Promise<PostDBType[]> {
        return DB.posts
    },
    async deletePost(id: string) {
        const postForDelete = DB.posts.find((post: PostDBType) => post.id === id)
        if (!postForDelete) {
            return false
        }
        DB.posts = DB.posts.filter((post: PostDBType) => post.id !== id)
        return true
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
            DB.posts = [...DB.posts, newPost]
            return newPost.id
        } else {
            return null
        }

        /*const newPost = {
            id: new Date().toISOString() + Math.random(),
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: body.blogId,
            blogName: (await blogsRepository.findBlog(body.blogId)!).name,
        }
        DB.posts = [...DB.posts, newPost]
        return newPost.id*/
    },
    async updatePost({params, body}: any): Promise<any> {
        const postForUpdate = DB.posts.find((post: PostDBType) => post.id === params)
        if (postForUpdate) {
            postForUpdate.title = body.title,
                postForUpdate.content = body.content,
                postForUpdate.shortDescription = body.shortDescription
            postForUpdate.blogId = body.blogId
            return postForUpdate
        }
        return null
    }
}