import {Router} from "express";
import {adminMiddleware} from "../global-middleware/admin-middleware";
import {usersValidator} from "../users/middlewares/usersValidator";
import {usersController} from "../composition-root";

export const usersRouter = Router()
usersRouter.get('/', usersController.getUsers.bind(usersController))
usersRouter.post('/', adminMiddleware, ...usersValidator, usersController.createUser.bind(usersController))
usersRouter.delete('/:id', adminMiddleware, usersController.deleteUser.bind(usersController))