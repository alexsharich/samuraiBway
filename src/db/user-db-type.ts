import {WithId} from "mongodb";

export type UserDBType = {
    passwordHash: string,
    login: string,
    email: string,
    createdAt: string
}

export type UserAccountDBType = WithId<{
    accountData: UserAccountType
    emailConfirmation: EmailConfirmationType
    passwordRecovery?: string
}>

type UserAccountType = {
    email: string
    userName: string
    passwordHash: string
    createdAt: Date
}
type EmailConfirmationType = {
    isConfirmed: boolean
    confirmationCode: string
    expirationDate: any
}
