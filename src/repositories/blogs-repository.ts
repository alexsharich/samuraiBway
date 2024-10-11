import {BlogDBType} from "../db/blog-db-type";
import {InputBlogType} from "../input-output-types/blog-types";
import {blogsCollection} from "./DB";



export const blogsRepository = {
    async findBlog(id: string ): Promise<BlogDBType | null> {

        const blog = await blogsCollection.findOne({id: id})
        if (blog) {
            return blog
        } else {
            return null
        }
        //return DB.blogs.find((blog: BlogDBType) => blog.id === id)
    },
    async getBlogs(): Promise<BlogDBType[]> {
        return blogsCollection.find({}).toArray()
        //return DB.blogs
    },
    async deleteBlog(id: string): Promise<boolean> {
        const result = await blogsCollection.deleteOne({id:id})
        if(result.deletedCount === 1){
            return true
        }else{
            return false
        }
        /*const blogForDelete = DB.blogs.find((blog: BlogDBType) => blog.id === id)
        if (!blogForDelete) {
            return false
        }
        DB.blogs = DB.blogs.filter((blog: BlogDBType) => blog.id !== blogForDelete.id)
        return true*/
    },
    async createBlog({name, description, websiteUrl}: InputBlogType): Promise<string> {
        const newBlog = {
            id: new Date().toISOString() + Math.random(),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        }
        const result = await blogsCollection.insertOne(newBlog)//дождаться промиса и отдать id ???
        // DB.blogs = [...DB.blogs, newBlog]
        return newBlog.id
    },
    async updateBlog({params, body}: any) {
        const result = await blogsCollection.updateOne({id: params}, {
            $set: {
                name: body.name,
                description: body.description,
                websiteUrl: body.websiteUrl
            }
        })

        if (result.matchedCount === 1) {
            return await blogsCollection.findOne({id: params})
        } else {
            return null
        }
        /*const blogForUpdate = DB.blogs.find((blog: BlogDBType) => blog.id === params)
        if (blogForUpdate) {
            blogForUpdate.name = body.name,
                blogForUpdate.description = body.description,
                blogForUpdate.websiteUrl = body.websiteUrl

            return blogForUpdate
        }
        return null*/
    }
}