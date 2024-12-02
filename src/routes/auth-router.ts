import {Router} from "express";
import {loginController} from "../auth/controllers/loginController";
import {authValidator, meValidator} from "../auth/middlewares/authValidator";
import {adminMiddleware} from "../global-middleware/admin-middleware";
import {meController} from "../auth/controllers/meController";
import {authMiddleware} from "../global-middleware/auth-middleware";

export const authRouter = Router()

authRouter.post('/registration',registerController)
authRouter.post('/login', authValidator, loginController)
authRouter.get('/me',meValidator, authMiddleware, meController)