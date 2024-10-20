
import {ObjectId} from "mongodb";
import {blogsCollection} from "../../repositories/DB";
import {BlogType} from "../service/blogs-service";

export const blogsRepository = {
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
    async createBlog(newBlog: BlogType): Promise<string | null> {
        try {
            const createdBlog = await blogsCollection.insertOne(newBlog)
            console.log('CREATE',createdBlog)
            return createdBlog.insertedId.toHexString()
        } catch (e){
            console.log('Create blog error : ',e)
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