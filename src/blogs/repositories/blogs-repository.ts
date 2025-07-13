import {BlogType} from "../service/blogs-service";
import {injectable} from "inversify";
import {BlogModel} from "../../db/blog-db-type";

@injectable()
export class BlogsRepository {
    async deleteBlog(id: string): Promise<boolean> {
        try {
            const result = await BlogModel.deleteOne({_id: id}).exec()
            return result.deletedCount === 1;
        } catch (e) {
            return false
        }
    }

    async createBlog(newBlog: BlogType): Promise<string | null> {
        try {
            const createdBlog = await BlogModel.insertOne(newBlog)
            await createdBlog.save()
            return createdBlog._id.toHexString()
        } catch (e) {
            console.log('Create blog error : ', e)
            return null
        }
    }

    async updateBlog({params, body}: any) {
        try {
            const blog = await BlogModel.findById(params).exec()

            if (!blog) {
                return null
            }

            blog.name = body.name
            blog.description = body.description
            blog.websiteUrl = body.websiteUrl

            await blog.save()
            return true

        } catch (e) {
            return null
        }
    }
}