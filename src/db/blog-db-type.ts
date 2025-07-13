import {HydratedDocument, model, Model, Schema} from "mongoose";

export type BlogDBType = {
    name: string
    description: string
    websiteUrl: string
    isMembership: boolean
    createdAt: string
}

export type BlogModelType = Model<BlogDBType>
export type BlogDocument = HydratedDocument<BlogDBType>

const BlogSchema = new Schema<BlogDBType>({
    name: {type: String, required: true},
    description: {type: String, required: true},
    websiteUrl: {type: String, required: true},
    isMembership: {type: Boolean, required: true},
    createdAt: {type: String, required: true}
})

export const BlogModel = model<BlogDBType, BlogModelType>('blogs', BlogSchema)