import {config} from 'dotenv'
config()

export const SETTINGS = {
    PORT:process.env.PORT || 3003,
    PATH:{
        POSTS:'/posts',
        BLOGS:'/blogs',
        TEST:'/testing',
        USERS:'/users',
        AUTH:'/auth',
        COMMENTS:'/comments',
        EMAIL:'/email'
    },
    ADMIN: process.env.ADMIN || 'admin:qwerty',
    JWT: process.env.JWT_SECRET || '111',
    SEND_EMAIL_PASS: process.env.EMAIL_PASS
}


