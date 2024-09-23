import {InputPostType} from "./post-types";
import {InputBlogType} from "./blog-types";

export type FieldNamesType = keyof InputPostType | keyof InputBlogType
// const f: FieldsType = 'some' // error

export type OutputErrorsType = {
    errorsMessages: {message: string, field: FieldNamesType}[]
}