import {HydratedDocument, model, Model, Schema} from "mongoose";


export type UserAccountDBType = {
    accountData: UserAccountType
    emailConfirmation: EmailConfirmationType
    passwordRecovery?: string
}

type UserAccountType = {
    email: string
    userName: string
    passwordHash: string
    createdAt: Date
}

type EmailConfirmationType = {
    isConfirmed: boolean
    confirmationCode: string
    expirationDate: Date
}

export type UserModelType = Model<UserAccountDBType>
export type UserDocument = HydratedDocument<UserAccountDBType>

const UserAccountSchema = new Schema<UserAccountType>({
    email: {type: String, required: true, unique: true},
    userName: {type: String, required: true},
    passwordHash: {type: String, required: true},
    createdAt: {type: Date, required: true}
})
const EmailConfirmationSchema = new Schema<EmailConfirmationType>({
    isConfirmed: {type: Boolean, default: false},
    expirationDate: {type: Date},
    confirmationCode: {type: String}
})
const UserSchema = new Schema<UserAccountDBType>({
        accountData: {type: UserAccountSchema, required: true},
        emailConfirmation: {type: EmailConfirmationSchema, required: true},
        passwordRecovery: {type: String, required: false}
    })
;
export const UserModel = model<UserAccountDBType, UserModelType>('users', UserSchema)


