import {UsersRepository} from "./users/repositories/users-repository";
import {UsersService} from "./users/service/users-service";
import {AuthService} from "./auth/service/auth-service";
import {EmailManager} from "./managers/emailManager";
import {BusinessService} from "./domain/businessServis";
import {DevicesService} from "./devices/service/devices-service";
import {DevicesRepository} from "./devices/repositories/devices-repository";
import {QueryDevicesRepository} from "./devices/repositories/query-devices-repository";
import {JwtService} from "./application/jwtService";
import {DeviceController} from "./devices/controllers/device.controller";
import {BlogsRepository} from "./blogs/repositories/blogs-repository";
import {BlogsQueryRepository} from "./blogs/repositories/blogs-query-repository";
import {PostsRepository} from "./posts/repositories/posts-repository";
import {PostsQueryRepository} from "./posts/repositories/post-query-repository";
import {BlogsService} from "./blogs/service/blogs-service";
import {PostsService} from "./posts/service/posts-service";
import {BlogsController} from "./blogs/controllers/blogsController";
import {UsersQueryRepository} from "./users/repositories/users-query-repository";
import {CommentsRepository} from "./comments/repositories/comments-repository";
import {CommentsQueryRepository} from "./comments/repositories/comments-query-repository";
import {CommentsService} from "./comments/service/comments-service";
import {PostsController} from "./posts/controllers/postsController";
import {CommentsController} from "./comments/controllers/commentsController";

export const usersRepository = new UsersRepository()
export const usersQueryRepository = new UsersQueryRepository()
export const devicesRepository = new DevicesRepository()
export const queryDevicesRepository = new QueryDevicesRepository()
export const blogsRepository = new BlogsRepository()
export const blogsQueryRepository = new BlogsQueryRepository()
export const postsRepository = new PostsRepository()
export const postsQueryRepository = new PostsQueryRepository()
export const commentsRepository = new CommentsRepository()
export const commentsQueryRepository = new CommentsQueryRepository()


export const jwtService = new JwtService()
export const emailService = new EmailManager()
export const businessService = new BusinessService()
export const devicesService = new DevicesService(devicesRepository, queryDevicesRepository)
export const usersService = new UsersService(usersRepository)
export const authService = new AuthService(usersRepository, emailService, businessService)
export const postsService = new PostsService(postsRepository, blogsQueryRepository)
export const blogsService = new BlogsService(blogsRepository, postsRepository, blogsQueryRepository)
export const commentsService = new CommentsService(commentsRepository, commentsQueryRepository, PostsService)


export const deviceController = new DeviceController(devicesService)
export const commentsController = new CommentsController(commentsService,commentsQueryRepository)
export const blogsController = new BlogsController(blogsService, blogsQueryRepository, postsQueryRepository)
export const postsController = new PostsController(postsQueryRepository, usersQueryRepository, postsService, commentsQueryRepository)