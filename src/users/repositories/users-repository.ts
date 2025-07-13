import {ObjectId} from "mongodb";
import {UserAccountDBType, UserDocument, UserModel} from "../../db/user-db-type";
import {add} from "date-fns/add";
import {v4 as uuidv4} from 'uuid'
import {injectable} from "inversify";

@injectable()
export class UsersRepository {

    async findUserWithEmailOrLogin(loginOrEmail: string) {
        return UserModel.findOne({$or: [{'accountData.userName': loginOrEmail}, {'accountData.email': loginOrEmail}]}).exec()
    }

    async checkUniqUserWithEmailOrLogin(login: string, email: string) {
        return UserModel.findOne({$or: [{'accountData.userName': login}, {'accountData.email': email}]}).exec()
    }

    async createUser(user: UserAccountDBType): Promise<string | null> {
        try {
            //const createdUser = await UserModel.insertOne(user)
            const createdUser = new UserModel(user)
            //return createdUser.insertedId.toString()
            await createdUser.save()
            return createdUser._id.toString()
        } catch (e) {
            console.log('Create user error : ', e)
            return null
        }
    }

    async newPassword(id: ObjectId, newPassword: string) {
        const user = await UserModel.findById(id).exec()
        if (!user) {
            return false
        }
        user.accountData.passwordHash = newPassword
        await user.save()
        return true
    }

    async deleteUser(id: string) {
        const result = await UserModel.deleteOne({_id: id}).exec()
        return result.deletedCount === 1
    }

    async updateConfirmation(userId: any) {

    }
    async save (user:UserDocument){
        await user.save()
        return user._id.toString()
    }

    async addRecoveryCode(userId: ObjectId, code: string) {
        //const result = await usersCollection.updateOne({_id: userId}, {$set: {passwordRecovery: code}})
        const user = await UserModel.findById(userId).exec()
        if (!user) {
            return false
        }
        user.passwordRecovery = code
        await user.save()
        return true
    }

    async findUserByConfirmationCode(emailConfirmationCode: string) {
        // return await usersCollection.findOne({'emailConfirmation.confirmationCode': emailConfirmationCode})

    }

    async updateCode(userId: ObjectId) {
        const newExpirationDate = add(new Date(), {hours: 1})
        /* await usersCollection.updateOne({_id: userId}, {
             $set: {
                 'emailConfirmation.expirationDate': newExpirationDate,
                 'emailConfirmation.confirmationCode': uuidv4(),
             }
         })*/
        const user = await UserModel.findById(userId).exec()
        if (!user) {
            throw new Error('not found')
        }
        user.emailConfirmation.expirationDate = newExpirationDate
        user.emailConfirmation.confirmationCode = uuidv4()
        await user.save()
    }
}
