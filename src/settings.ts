import {config} from 'dotenv'
config()

export const SETTINGS = {
    PORT:process.env.PORT || 3003,
    PATH:{
        POSTS:'/posts',
        BLOGS:'/blogs',
        TEST:'/testing',
        USERS:'/users',
        AUTH:'/auth'
    },
    ADMIN: process.env.ADMIN || 'admin:qwerty',
    JWT: process.env.JWT_SECRET || '111'
}


