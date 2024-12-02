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
        const passwordHash = await this._generateHash(password) ///pofiksit
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
                    hours:1,
                    minutes:3
                }),
                isConfirme: false
            }
        }
        const createResult = usersRepository.createUser(user)
        await emailManager.sendEmailConfirmationMessage(user)
        return createResult
    }
}