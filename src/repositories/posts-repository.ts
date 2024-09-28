import {PostDBType} from "../db/post-db-type";
import {DB} from "../db/db";
import {InputPostType} from "../input-output-types/post-types";
import {blogsRepository} from "./blogs-repository";
import {BlogDBType} from "../db/blog-db-type";


export const postsRepository = {
    findPost(id: string | null) {
        return DB.blogs.find((post: PostDBType) => post.id === id)
    },
    getPosts() {
        return DB.posts
    },
    deletePost(id: string) {
        const postForDelete = DB.posts.find((post: PostDBType) => post.id === id)
        if (!postForDelete) {
            return false
        }
        DB.posts = DB.posts.filter((post: PostDBType) => post.id !== id)
        return true
    },
    createPost({title, shortDescription, content, blogId}: any) {
const blogIdForCreated = DB.blogs.find((blog:BlogDBType)=>blog.id === blogId)
        if(blogIdForCreated){
            const newPost = {
                id: new Date().toISOString() + Math.random(),
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId,
                blogName: blogsRepository.findBlog(blogId)!.name
            }
            DB.posts = [...DB.posts, newPost]
            return newPost.id
        } return  null
    },
    updatePost({params, body}: any) {
        const postForUpdate = DB.posts.find((post: PostDBType) => post.id === params.id)
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