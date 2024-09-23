import {Request, Response} from 'express'
import {OutputErrorsType} from "../input-output-types/output-errors-type";
import {OutputPostType} from "../input-output-types/post-types";

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

export type OutputType =  OutputErrorsType | OutputPostType

export const someController = (
    req: Request<ParamType, OutputType, BodyType, QueryType>,
    res: Response<OutputType>
) => {

}