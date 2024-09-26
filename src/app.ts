import express from 'express'
import cors from 'cors'
import {SETTINGS} from "./settings";
import {testingRouter} from "./routes/test-router";
import {postsRouter} from "./routes/posts-router";
import {blogsRouter} from "./routes/blogs-router";
import bodyParser from 'body-parser'
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