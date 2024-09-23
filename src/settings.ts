import {config} from 'dotenv'
config()

export const SETTINGS = {
    PORT:process.env.PORT || 3003,
    PATH:{
        POSTS:'/posts',
        BLOGS:'/blogs',
        TEST:'/testing'
    },
    ADMIN: process.env.ADMIN || 'admin:qwerty',
}
