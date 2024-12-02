import {ObjectId} from "mongodb";
import {usersCollection} from "../../repositories/DB";
import {UserDBType} from "../../db/user-db-type";

export const usersRepository = {
    async findUserWithEmailOrLogin(loginOrEmail: string) {
        return await usersCollection.findOne({$or: [{login: loginOrEmail}, {email: loginOrEmail}]})
    },
    async checkUniqUserWithEmailOrLogin(login: string, email: string) {
        return await usersCollection.findOne({$or: [{login: login}, {email: email}]})
    },
    async createUser(user: UserDBType): Promise<string | null> {
        try {
            const createdUser = await usersCollection.insertOne(user)
            return createdUser.insertedId.toHexString()
        } catch (e) {
            console.log('Create blog error : ', e)
            return null
        }
    },
    async deleteUser(id: string) {
        try {
            const userId = new ObjectId(id)
            const result = await usersCollection.deleteOne({_id: userId})
            if (result.deletedCount === 1) return true
            return false
        } catch (e) {
            return false
        }
    },
    async updateConfirmation(id: string) {
        let userId = new ObjectId(id)
        let result = await usersCollection.updateOne({userId}, {$set: {'emailConfirmation.isConfirmed': true}})
        return result.modifiedCount === 1
    },
    async findUserByConfirmationCode(emailConfirmationCode) {
        const user = usersCollection.findOne({'emailConfirmation.confirmationeCode': emailConfirmationCode})
        return user
    }
}