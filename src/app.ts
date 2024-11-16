import express from 'express'
import cors from 'cors'
import {SETTINGS} from "./settings";
import {testingRouter} from "./routes/test-router";
import {postsRouter} from "./routes/posts-router";
import {blogsRouter} from "./routes/blogs-router";
import bodyParser from 'body-parser'
import {usersRouter} from "./routes/users-router";
import {authRouter} from "./routes/auth-router";
import {commentsRouter} from "./routes/comments-router";
export const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/',(req,res)=>{
    res.status(200).json({version:'1.0'})
})
app.use(SETTINGS.PATH.TEST,testingRouter)
app.use(SETTINGS.PATH.POSTS, postsRouter)
app.use(SETTINGS.PATH.BLOGS,blogsRouter)
app.use(SETTINGS.PATH.USERS,usersRouter)
app.use(SETTINGS.PATH.AUTH,authRouter)
app.use(SETTINGS.PATH.COMMENTS,commentsRouter)