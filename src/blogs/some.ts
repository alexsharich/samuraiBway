import {Request, Response} from 'express'
import {OutputErrorsType} from "../input-output-types/output-errors-type";
import {OutputBlogType} from "../input-output-types/blog-types";

export type ParamType = {
    id: string
}

export type BodyType = {
    id: number
    title: string
    // ...
}

export type QueryType = {
    search?: string
}

export type OutputType = OutputErrorsType | OutputBlogType

export const someController = (
    req: Request<ParamType, OutputType, BodyType, QueryType>,
    res: Response<OutputType>
) => {

}