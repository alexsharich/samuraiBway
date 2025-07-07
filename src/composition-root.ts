import {UsersRepository} from "./users/repositories/users-repository";
import {DevicesRepository} from "./devices/repositories/devices-repository";
import {JwtService} from "./application/jwtService";
import {DeviceController} from "./devices/controllers/device.controller";
import {BlogsRepository} from "./blogs/repositories/blogs-repository";
import {BlogsQueryRepository} from "./blogs/repositories/blogs-query-repository";
import {PostsRepository} from "./posts/repositories/posts-repository";
import {PostsQueryRepository} from "./posts/repositories/post-query-repository";

import {AuthController} from "./auth/controllers/auth.controller";
import {UsersController} from "./users/controllers/users.controller";
import {CommentsController} from "./comments/controllers/comments.controller";
import {BlogsController} from "./blogs/controllers/blogs.controller";
import {PostsController} from "./posts/controllers/posts.controller";
import {Container} from "inversify";
import "reflect-metadata"
import {UsersQueryRepository} from "./users/repositories/users-query-repository";
import {PostsService} from "./posts/service/posts-service";
import {CommentsQueryRepository} from "./comments/repositories/comments-query-repository";
import {CommentsService} from "./comments/service/comments-service";
import {CommentsRepository} from "./comments/repositories/comments-repository";
import {BlogsService} from "./blogs/service/blogs-service";
import {UsersService} from "./users/service/users-service";
import {AuthService} from "./auth/service/auth-service";
import {EmailManager} from "./managers/emailManager";
import {BusinessService} from "./domain/businessServis";
import {DevicesService} from "./devices/service/devices-service";
import {QueryDevicesRepository} from "./devices/repositories/query-devices-repository";

export const container = new Container()
container.bind(JwtService).to(JwtService)
container.bind(EmailManager).to(EmailManager)
container.bind(BusinessService).to(BusinessService)

container.bind(AuthService).to(AuthService)
container.bind(AuthController).to(AuthController)

container.bind(DevicesService).to(DevicesService)
container.bind(DeviceController).to(DeviceController)
container.bind(DevicesRepository).to(DevicesRepository)
container.bind(QueryDevicesRepository).to(QueryDevicesRepository)

container.bind(CommentsController).to(CommentsController)
container.bind(CommentsService).to(CommentsService)
container.bind(CommentsRepository).to(CommentsRepository)
container.bind(CommentsQueryRepository).to(CommentsQueryRepository)

container.bind(PostsQueryRepository).to(PostsQueryRepository)
container.bind(PostsController).to(PostsController)
container.bind(PostsRepository).to(PostsRepository)
container.bind(PostsService).to(PostsService)

container.bind(BlogsService).to(BlogsService)
container.bind(BlogsController).to(BlogsController)
container.bind(BlogsRepository).to(BlogsRepository)
container.bind(BlogsQueryRepository).to(BlogsQueryRepository)


container.bind(UsersService).to(UsersService)
container.bind(UsersController).to(UsersController)
container.bind(UsersRepository).to(UsersRepository)
container.bind(UsersQueryRepository).to(UsersQueryRepository)