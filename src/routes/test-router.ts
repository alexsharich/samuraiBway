import {Router} from 'express'
import {container} from "../composition-root";
import {PostsController} from "../posts/controllers/posts.controller";

const postsController = container.get(PostsController)
export const testingRouter = Router()

testingRouter.delete('/all-data', postsController.clearData.bind(postsController))


