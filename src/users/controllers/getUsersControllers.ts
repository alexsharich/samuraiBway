import {Request, Response} from "express";
import {usersQueryRepository} from "../repositories/users-query-repository";
import {
    paginationQueriesForUsers,
    PaginationQueriesUsersType
} from "../../helpers/pagination_values";

export const getUsersController = async (req: Request<{},{},{},PaginationQueriesUsersType>, res: Response) => {
    const sortFilter = paginationQueriesForUsers(req.query)

   const users =  await usersQueryRepository.getUsers(sortFilter)
    if(users){
        res.status(200).send(users)
    }
}