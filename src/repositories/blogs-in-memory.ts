import {BlogDBType} from "../db/blog-db-type";
import {DB} from "../db/db";
import {InputBlogType} from "../input-output-types/blog-types";

export const blogsRepository = {
    async findBlog(id: string | null):Promise<BlogDBType> {
        return DB.blogs.find((blog: BlogDBType) => blog.id === id)
    },
    async getBlogs():Promise<BlogDBType[]> {
        return DB.blogs

    },
    async deleteBlog(id: string):Promise<boolean> {
        const blogForDelete = DB.blogs.find((blog: BlogDBType) => blog.id === id)
        if (!blogForDelete) {
            return false
        }
        DB.blogs = DB.blogs.filter((blog: BlogDBType) => blog.id !== blogForDelete.id)
        return true
    },
    async createBlog({name, description, websiteUrl}: InputBlogType):Promise<string> {
        const newBlog = {
            id: new Date().toISOString() + Math.random(),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        }
        DB.blogs = [...DB.blogs, newBlog]
        return newBlog.id
    },
    async updateBlog({params, body}: any) {
        const blogForUpdate = DB.blogs.find((blog: BlogDBType) => blog.id === params)
        if (blogForUpdate) {
            blogForUpdate.name = body.name,
                blogForUpdate.description = body.description,
                blogForUpdate.websiteUrl = body.websiteUrl

            return blogForUpdate
        }
        return null
    }
}