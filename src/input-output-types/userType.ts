export type OutputUserType = {
    id: string,
    login: string,
    email: string,
    createdAt: Date
}

export type InputUserType = {
    login: string,
    password: string,
    email: string
}