import {MongoClient} from 'mongodb'
import dotenv from 'dotenv'
import {PostDBType} from "../db/post-db-type";
import {BlogDBType} from "../db/blog-db-type";
dotenv.config()

const mongoUri = process.env.mongoURL || 'mongodb+srv://alexandev444:EDBJ9FI1lCHHvqlw@cluster0.yfpj9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const client = new MongoClient(mongoUri)
const DB = client.db('social')
export const postsCllection = DB.collection<PostDBType>('posts')
export const blogsCollection = DB.collection<BlogDBType>('blogs')
export async function runDb() {
    try {
        await client.connect()
        await client.db('social').command({ping: 1})
        console.log('Connected successfully to mongo server')
    } catch {
        await client.close()
    }
}