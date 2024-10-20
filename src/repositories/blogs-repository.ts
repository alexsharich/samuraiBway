import {BlogDBType} from "../db/blog-db-type";
import {InputBlogType, OutputBlogType} from "../input-output-types/blog-types";
import {blogsCollection} from "./DB";
import {ObjectId, WithId} from "mongodb";

const mapToOutput = (blog: WithId<BlogDBType>): OutputBlogType => {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership,
    }
}

export const blogsRepository = {
    async findBlog(id: string): Promise<BlogDBType | null> {
        try {
            const blogId = new ObjectId(id)
            const blog = await blogsCollection.findOne({_id: blogId})
            if (blog) return mapToOutput(blog)
            return null
        } catch (e) {
            return null
        }
    },
    async getBlogs(): Promise<OutputBlogType[]> {
        try {
            const blogs = await blogsCollection.find({}).toArray()
            return blogs.map(mapToOutput)
        } catch {
            throw new Error('Blogs not found')
        }

    },
    async deleteBlog(id: string): Promise<boolean> {
        try {
            const blogId = new ObjectId(id)
            const result = await blogsCollection.deleteOne({_id: blogId})
            if (result.deletedCount === 1) return true
            return false
        } catch (e) {
            return false
        }
    },
    async deleteAllBlogs() {
        try {
            await blogsCollection.deleteMany({})
        } catch (e) {
            throw new Error('Delete...Something wrong')
        }

    },
    async createBlog({name, description, websiteUrl}: InputBlogType): Promise<ObjectId | null> {
        try {
            const newBlog = {
                name: name,
                description: description,
                websiteUrl: websiteUrl,
                isMembership: false,
                createdAt: (new Date().toISOString())
            }
            const result = await blogsCollection.insertOne(newBlog)//дождаться промиса и отдать id ???
            return result.insertedId
        } catch {
            return null
        }

    },
    async updateBlog({params, body}: any) {
        try {
            const blogId = new ObjectId(params)

            const result = await blogsCollection.updateOne({_id: blogId}, {
                $set: {
                    name: body.name,
                    description: body.description,
                    websiteUrl: body.websiteUrl
                }
            })

            if (result.matchedCount === 1) return true
            return null

        } catch (e) {
            return null
        }
    }
}