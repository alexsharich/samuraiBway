import {Router} from 'express'
import {clearData} from "../posts/controllers/clearData";
export const testingRouter = Router()

testingRouter.delete('/all-data',clearData)


