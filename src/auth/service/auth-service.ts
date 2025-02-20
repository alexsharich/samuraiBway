import {LoginInputType} from "../controllers/loginController";
import {usersRepository} from "../../users/repositories/users-repository";
import bcrypt from "bcrypt";
import {emailManager} from "../../managers/emailManager";
import {ObjectId} from "mongodb";
import {v4 as uuidv4} from 'uuid'
import add from 'date-fns/add'

export const authService = {
    async loginWithEmailOrLogin({loginOrEmail, password}: LoginInputType): Promise<string | null> {
        const user = await usersRepository.findUserWithEmailOrLogin(loginOrEmail)
        // if(!user.emailConfirmation.isConfirmed){
        //     return null
        // }
        if (user) {
            const match = await bcrypt.compare(password, user.passwordHash);
            if (match) {
                console.log('Login successful!');
                return String(user._id)
            }
        }
        console.log('User not found.');
        return null
    },
    async createUserA(login, email, password) {
        const passwordHash = await this._generateHash(password)
        const user = {
            _id: new ObjectId(),
            accountDate: {
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
                isConfirme: false
            }
        }
        const createResult = usersRepository.createUser(user)
        try {
            await emailManager.sendEmailConfirmationMessage(user)
        } catch (error) {
            console.error(error)
            await usersRepository.deleteUser(String(user._id))
            return null
        }
        return createResult
    },
    async confirmEmail(code) {
        let user = await usersRepository.findUserByConfirmationCode(code)
        if (!user) return false
        if (user.emailConfirmation.isConfirmed) return false
        if (user.emailConfirmation.confirmationCode !== code) return false
        if (user.emailConfirmation.expirationDate < new Date()) return false
        let result = await usersRepository.updateConfirmation(String(user._id))
        return result
    },
    async resendingEmail(email:string){
        const user = await usersRepository.findUserWithEmailOrLogin(email)

    },
    // async _generateHash(password: string) {
    //     const hash = await bcrypt.hash(password, 10)
    //     return hash
    // },
    async checkCredentials(loginOrEmail: string, password: string) {
        const user = await usersRepository.findUserWithEmailOrLogin(loginOrEmail)
        if (!user) return null
        if (!user.emailConfirmation.isConfirmed) return null
        const isHashesEguals = await this.isPasswordCorrect(password, user.acountData.passwordHash)
        if (!isHashesEguals) {
            return user
        } else {
            return null
        }
    },
    async isPasswordCorrect(password: string, hash: string) {
        const isEqual = await bcrypt.compare(password,hash)
        if(!isEqual){
            return null
        }
    }
}