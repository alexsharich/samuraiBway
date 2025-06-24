import {MongoClient} from 'mongodb'
import dotenv from 'dotenv'
import {PostDBType} from "../db/post-db-type";
import {BlogDBType} from "../db/blog-db-type";
import {UserAccountDBType} from "../db/user-db-type";
import {CommentDBType} from "../db/comment-db-type";
import {BlackListDBType} from "../db/black_list-db-type";
import {Device} from "../db/devices-db-type";
import {ApiRequest} from "../db/api-requests";

dotenv.config()

const mongoUri = process.env.MONGO_URL
if (!mongoUri) {
    throw new Error('INVALID MONGO URL')
}
export const client = new MongoClient(mongoUri)
const DB = client.db('social')
export const postsCollection = DB.collection<PostDBType>('posts')
export const blogsCollection = DB.collection<BlogDBType>('blogs')
export const usersCollection = DB.collection<UserAccountDBType>('users')
export const commentsCollection = DB.collection<CommentDBType>('comment')
export const blackListCollection = DB.collection<BlackListDBType>('blackList')
export const devicesCollection = DB.collection<Device>('devices')

export const apiRequestCollection = DB.collection<ApiRequest>('apiRequests')

export async function runDb() {
    try {
        await client.connect()
        await client.db('social').command({ping: 1})
        console.log('Connected successfully to mongo server')
    } catch {
        await client.close()
    }
}