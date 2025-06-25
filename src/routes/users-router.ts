import {Router} from "express";
import {adminMiddleware} from "../global-middleware/admin-middleware";
import {usersValidator} from "../users/middlewares/usersValidator";
import {usersController} from "../composition-root";

export const usersRouter = Router()
usersRouter.get('/', usersController.getUsers)
usersRouter.post('/', adminMiddleware, ...usersValidator, usersController.createUser)
usersRouter.delete('/:id', adminMiddleware, usersController.deleteUser)