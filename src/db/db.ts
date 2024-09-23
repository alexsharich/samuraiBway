export type DBType = { // типизация базы данных (что мы будем в ней хранить)
    posts: any
    blogs: any
    // some: any[]
}

export const DB: DBType = { // создаём базу данных (пока это просто переменная)
    posts: [],
    blogs: []
}

// функция для быстрой очистки/заполнения базы данных для тестов
export const setDB = (dataset?: Partial<DBType>) => {
    if (!dataset) { // если в функцию ничего не передано - то очищаем базу данных
        DB.posts = []
        DB.blogs = []
        return
    }

    // если что-то передано - то заменяем старые значения новыми
    DB.blogs = dataset.blogs || DB.blogs
    DB.posts = dataset.posts || DB.posts
    // db.some = dataset.some || db.some
}