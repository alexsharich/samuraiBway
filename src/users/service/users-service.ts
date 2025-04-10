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
        const {login, email, password} = user
        const errors = []
        const isUnique = await usersRepository.checkUniqUserWithEmailOrLogin(login, email)
        if (isUnique) {
            if (isUnique.email === email) {
                errors.push({field: 'email', message: 'email should be unique'})
            }
            if (isUnique.login === login) {
                errors.push({field: 'email', message: 'login should be unique'})
            }
            return errors
        }
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = {
            _id: new ObjectId(),
            accountData: {
                userName: login,
                email,
                passwordHash,
                createdAt: new Date()
            },
            emailConfirmation: {
                confirmationCode: uuidv4(),
                experationDate: add(new Date, {
                    hours: 1,
                }),
                isConfirme: isAdmin ? true : false
            }
        }

        return await usersRepository.createUserA(newUser)

        /*?????????*/ await emailManager.sendEmailConfirmationMessage()
    },
    async deleteUser(id: string): Promise<boolean> {
        return await usersRepository.deleteUser(id)
    }
}