import {InputPostType} from "./post-types";
import {InputBlogType} from "./blog-types";

export type FieldNamesType = keyof InputPostType | keyof InputBlogType

export type OutputErrorsType = {
    errorsMessages: {message: string, field: FieldNamesType}[]
}