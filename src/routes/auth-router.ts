import {Router} from "express";
import {loginController} from "../auth/controllers/loginController";
import {authValidator} from "../auth/middlewares/authValidator";
import {adminMiddleware} from "../global-middleware/admin-middleware";

export const authRouter = Router()

authRouter.post('/login',authValidator,loginController)