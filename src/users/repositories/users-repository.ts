import {ObjectId} from "mongodb";
import {blackListCollection, usersCollection} from "../../repositories/DB";
import {UserAccountDBType} from "../../db/user-db-type";
import {add} from "date-fns/add";
import {v4 as uuidv4} from 'uuid'

export class UsersRepository  {
    async findUserWithEmailOrLogin(loginOrEmail: string) {
        return await usersCollection.findOne({$or: [{'accountData.userName': loginOrEmail}, {'accountData.email': loginOrEmail}]})
    }
    async checkUniqUserWithEmailOrLogin(login: string, email: string) {
        return await usersCollection.findOne({$or: [{'accountData.userName': login}, {'accountData.email': email}]})
    }
    async createUser(user: UserAccountDBType): Promise<string | null> {
        try {
            const createdUser = await usersCollection.insertOne(user)
            return createdUser.insertedId.toString()
        } catch (e) {
            console.log('Create user error : ', e)
            return null
        }
    }
    async deleteUser(id: string) {
        const userId = new ObjectId(id)
        const result = await usersCollection.deleteOne({_id: userId})
        if (result.deletedCount === 1) return true
        return false
    }
    async updateConfirmation(userId: any) {
        const result = await usersCollection.updateOne({_id: userId}, {$set: {'emailConfirmation.isConfirmed': true}})
        return result.modifiedCount === 1
    }
    async findUserByConfirmationCode(emailConfirmationCode: string) {
        const user = await usersCollection.findOne({'emailConfirmation.confirmationCode': emailConfirmationCode})
        return user
    }
    async updateCode(userId: ObjectId) {
        const newExpirationDate = add(new Date(), {hours: 1})
        await usersCollection.updateOne({_id: userId}, {
            $set: {
                'emailConfirmation.expirationDate': newExpirationDate,
                'emailConfirmation.confirmationCode': uuidv4(),
            }
        })
    }
    async tokenToBlackList(oldRefreshToken: string) {
        const oldTokenId = await blackListCollection.insertOne({
            token: oldRefreshToken
        })
        console.log(oldTokenId.acknowledged)
        return oldTokenId.acknowledged
    }
}
