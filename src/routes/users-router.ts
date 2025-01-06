import {Router} from "express";
import {getUsersController} from "../users/controllers/getUsersControllers";
import {createUserController} from "../users/controllers/createUserController";
import {deleteUserController} from "../users/controllers/deleteUserController";
import {adminMiddleware} from "../global-middleware/admin-middleware";
import {usersValidator} from "../users/middlewares/usersValidator";

export const usersRouter = Router()
usersRouter.get('/',getUsersController)
usersRouter.post('/',adminMiddleware,...usersValidator,createUserController)
usersRouter.delete('/:id',adminMiddleware,deleteUserController)