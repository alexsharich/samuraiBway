import {BlogDBType} from "../db/blog-db-type";
import {InputBlogType, OutputBlogType} from "../input-output-types/blog-types";
import {ObjectId} from "mongodb";
import {blogsCollection} from "../repositories/DB";
import {blogsRepository} from "../repositories/blogs-repository";

export type BlogType = {
    name: string,
    description: string,
    websiteUrl: string,
    isMembership: boolean,
    createdAt: string
}
export const blogsService = {
    async findBlog(id: string): Promise<BlogDBType | null> {
        return await blogsRepository.findBlog(id)
    },
    async getBlogs(): Promise<OutputBlogType[]> {
        return await blogsRepository.getBlogs()
    },
    async deleteBlog(id: string): Promise<boolean> {
        return await blogsRepository.deleteBlog(id)
    },
    async deleteAllBlogs() {
        return await blogsRepository.deleteAllBlogs()
    },
    async createBlog({name, description, websiteUrl}: InputBlogType): Promise<ObjectId | null> {

        const newBlog: BlogType = {
            name: name,
            description: description,
            websiteUrl: websiteUrl,
            isMembership: false,
            createdAt: (new Date().toISOString())
        }

        return await blogsRepository.createBlog(newBlog)
    },
    async updateBlog({params, body}: any) {
        return await blogsRepository.updateBlog({params,body})
    }

}