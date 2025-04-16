import {usersRepository} from "../repositories/users-repository";
import {InputUserType} from "../../input-output-types/userType";
import bcrypt from 'bcrypt'
import {ObjectId} from "mongodb";
import {usersCollection} from "../../repositories/DB";
import {v4 as uuidv4} from "uuid";
import add from "date-fns/add";
import {emailAdapter} from "../../adapters/emailAdapter";
import {emailManager} from "../../managers/emailManager";

export const usersService = {
    async createUser(user: InputUserType, isAdmin: boolean = false) {

        /*    const errors =[]
            const isUnique = await usersRepository.checkUniqUserWithEmailOrLogin(user.login,user.email)
            if(isUnique){
                if(isUnique.email === user.email){
                    errors.push({field: 'email', message: 'email should be unique'})
                }
                if(isUnique.login === user.login) {
                    errors.push({field: 'email', message: 'login should be unique'})
                }
                return errors
            }
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(user.password,salt)
            const newUser ={
                _id:new ObjectId(),
                passwordHash: hash,
                login: user.login,
                email: user.email,
                createdAt: (new Date().toISOString())
            }
            return await usersRepository.createUser(newUser)*/


        const errors = []
        const isUnique = await usersRepository.checkUniqUserWithEmailOrLogin(user.login, user.email)
        if (isUnique) {
            if (isUnique.email === user.email) {
                errors.push({field: 'email', message: 'email should be unique'})
            }
            if (isUnique.login === user.login) {
                errors.push({field: 'email', message: 'login should be unique'})
            }
            return errors
        }
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(user.password, salt)
        const now  = new Date()

        const newUser = {
            _id: new ObjectId(),
            accountData: {
                userName: user.login,
                email:user.email,
                passwordHash,
                createdAt: new Date()
            },
            emailConfirmation: {
                confirmationCode: uuidv4(),
                experationDate: add(now, {
                    hours: 1,
                }),
                isConfirme: isAdmin ? true : false
            }
        }

        return await usersRepository.createUserA(newUser)

        /*?????????*/  //await emailManager.sendEmailConfirmationMessage()
    },
    async deleteUser(id: string): Promise<boolean> {
        return await usersRepository.deleteUser(id)
    }
}