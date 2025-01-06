import {Request, Response} from 'express'
import {usersQueryRepository} from "../../users/repositories/users-query-repository";


export const meController = async (req: Request<any, any, any>, res: Response) => {
    const userId = req.userId
    if (userId) {
        const user = await usersQueryRepository.findUser(userId)
        if (user) {
            res.status(200).send({
                email: user.email,
                login: user.login,
                userId: user.id
            })
        }
        return
    }
    res.sendStatus(401)
}