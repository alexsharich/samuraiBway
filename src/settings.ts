import {config} from 'dotenv'

config()

export const SETTINGS = {
    PORT: process.env.PORT || 3003,
    PATH: {
        POSTS: '/posts',
        BLOGS: '/blogs',
        TEST: '/testing',
        USERS: '/users',
        AUTH: '/auth',
        COMMENTS: '/comments',
        EMAIL: '/email',
        DEVICES: '/security'
    },
    ADMIN: process.env.ADMIN || 'admin:qwerty',
    JWT: process.env.JWT_SECRET || '111',
    JWT_ACCESS: process.env.JWT_ACCESS_SECRET || '222',
    JWT_REFRESH: process.env.JWT_REFRESH_SECRET || '333',
    SEND_EMAIL_PASS: process.env.EMAIL_PASS
}


