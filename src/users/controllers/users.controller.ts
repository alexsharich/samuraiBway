import {Request, Response} from "express";
import {paginationQueriesForUsers, PaginationQueriesUsersType} from "../../helpers/pagination_values";
import {UsersQueryRepository} from "../repositories/users-query-repository";
import {usersService} from "../../composition-root";
import {InputUserType} from "../../input-output-types/userType";

export class UsersController {

    constructor(private usersQueryRepository: UsersQueryRepository) {

    }

    async getUsers(req: Request<{}, {}, {}, PaginationQueriesUsersType>, res: Response) {
        const sortFilter = paginationQueriesForUsers(req.query)

        const users = await this.usersQueryRepository.getUsers(sortFilter)
        if (users) {
            res.status(200).send(users)
        }
    }

    async deleteUser(req: Request<{ id: string }>, res: Response) {
        const isDeleted = await usersService.deleteUser(req.params.id)
        if (!isDeleted) {
            res.sendStatus(404)
            return
        }
        res.sendStatus(204)
    }

    async createUser(req: Request<any, any, InputUserType>, res: Response) {

        const isNewUserCreated = await usersService.createUser(req.body)

        if (Array.isArray(isNewUserCreated)) {
            res.status(400).json({
                errorsMessages: isNewUserCreated
            })
            return
        }


        const newUser = await this.usersQueryRepository.findUser(isNewUserCreated as string)
        if (newUser) {
            res.status(201).json(newUser)
            return
        }
        res.sendStatus(404)
    }
}