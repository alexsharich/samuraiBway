import {PostDBType} from "../db/post-db-type";
import {DB} from "../db/db";
import {InputBlogType} from "../input-output-types/blog-types";
import {InputPostType} from "../input-output-types/post-types";


export const postsRepository = {
    findPost(id: string | null) {
        const foundedPost = DB.blogs.find((post: PostDBType) => post.id === id)

        if (!foundedPost || id === undefined) {
            return
        }
        return foundedPost
    },
    getPosts() {
        const posts = DB.posts
        return posts
    },
    deletePost(id: string) {
        const postForDelete = DB.posts.find((post:PostDBType) => post.id === id)
        if (!postForDelete) {
            return false
        }
        DB.posts = DB.posts.filter((post:PostDBType) => post.id !== id)
        return true
    },
    createPost({title, shortDescription, content, blogId}:InputPostType) {
        const newPost = {
            id: new Date(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: 'new Blog name'
        }
        DB.posts.push(newPost)///куда пушить ,,,
        return newPost
    },
    updatePost({params, body}:any) {
        const postForUpdate = DB.posts.find((post:PostDBType) => post.id === params.id)
        if (postForUpdate) {
            postForUpdate.title = body.title,
                postForUpdate.content = body.content,
                postForUpdate.shortDescription = body.shortDescription
            postForUpdate.blogId = body.blogId


            return true
        }
        return false

    }
}