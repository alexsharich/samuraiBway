import {ObjectId, WithId} from "mongodb";
import {usersCollection, usersCollectionA} from "../../repositories/DB";
import {UserAccountDBType, UserDBType} from "../../db/user-db-type";

export const usersRepository = {
    async findUserWithEmailOrLogin(loginOrEmail: string) {
        return await usersCollection.findOne({$or: [{login: loginOrEmail}, {email: loginOrEmail}]})
    },
    async checkUniqUserWithEmailOrLogin(login: string, email: string) {
        return await usersCollection.findOne({$or: [{login: login}, {email: email}]})
    },
    async createUserA(user:UserAccountDBType):Promise<string | null>{
        try {
            const createdUser = await usersCollectionA.insertOne(user)
            return createdUser.insertedId.toHexString()
        } catch (e) {
            console.log('Create blog error : ', e)
            return null
        }
    },
    async createUser(user: WithId<UserDBType>): Promise<string | null> {
        try {
            const createdUser = await usersCollection.insertOne(user)
            return createdUser.insertedId.toHexString()
        } catch (e) {
            console.log('Create blog error : ', e)
            return null
        }
    },
    async deleteUser(id: string) {
        const userId = new ObjectId(id)
        const result = await usersCollection.deleteOne({_id: userId})
        if (result.deletedCount === 1) return true
        return false
    },
    async updateConfirmation(id: string) {
        let userId = new ObjectId(id)
        let result = await usersCollection.updateOne({userId}, {$set: {'emailConfirmation.isConfirmed': true}})
        return result.modifiedCount === 1
    },
    async findUserByConfirmationCode(emailConfirmationCode:string) {
        const user = usersCollection.findOne({'emailConfirmation.confirmationCode': emailConfirmationCode})
        return user
    }
}