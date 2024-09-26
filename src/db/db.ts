export type DBType = {
    posts: any
    blogs: any
}

export const DB: DBType = {
    posts: [],
    blogs: []
}

export const setDB = (dataset?: Partial<DBType>) => {
    if (!dataset) {
        DB.posts = []
        DB.blogs = []
        return
    }

    DB.blogs = dataset.blogs || DB.blogs
    DB.posts = dataset.posts || DB.posts
}