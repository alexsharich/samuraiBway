import {BlogDBType} from "../db/blog-db-type";
import {DB} from "../db/db";
import {InputBlogType} from "../input-output-types/blog-types";

export const blogsRepository = {
    findBlog(id: string | null) {
        const foundedBlog = DB.blogs.find((blog: BlogDBType) => blog.id === id)

        if (!foundedBlog || id === undefined) {
            return
        }
        return foundedBlog
    },
    getBlogs() {
        const blogs = DB.blogs
        return blogs
    },
    deleteBlog(id: string) {
        const blogForDelete = DB.blogs.find((blog:BlogDBType) => blog.id === id)
        if (!blogForDelete) {
            return false
        }
        DB.blogs = DB.blogs.filter((blog:BlogDBType) => blog.id !== id)
        return true
    },
    createBlog({name, description, websiteUrl}:InputBlogType) {
        const newBlog = {
            id: new Date().toISOString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        }
        DB.blogs.push(newBlog)
        return newBlog
    },
    updateBlog({params,body}:any) {
        const blogForUpdate = DB.blogs.find((blog:BlogDBType) => blog.id === params.id)
        if (blogForUpdate) {
            blogForUpdate.name = body.name,
                blogForUpdate.description = body.description,
                blogForUpdate.websiteUrl = body.websiteUrl

            return true
        }
        return false

    }
}