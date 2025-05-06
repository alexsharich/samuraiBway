import {LoginInputType} from "../controllers/loginController";
import {usersRepository} from "../../users/repositories/users-repository";
import bcrypt from "bcrypt";
import {emailManager} from "../../managers/emailManager";
import {ObjectId} from "mongodb";
import {v4 as uuidv4} from 'uuid'
import {add} from "date-fns/add";
import {businessServis} from "../../domain/businessServis";

export const authService = {
    async loginWithEmailOrLogin({loginOrEmail, password}: LoginInputType): Promise<string | null> {
        const user = await usersRepository.findUserWithEmailOrLogin(loginOrEmail)
        if (!user) {
            console.log('User not found.');
            return null
        }
        const match = await bcrypt.compare(password, user.accountData.passwordHash);
        if (!match) {
            return null
        }
        console.log('Login successful!');
        return String(user._id)
    },
    async createUser(login: string, email: string, password: string) {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt)
        const now = new Date()
        const user = {
            _id: new ObjectId(),
            accountData: {
                userName: login,
                email,
                passwordHash,
                createdAt: new Date()
            },
            emailConfirmation: {
                confirmationCode: uuidv4(),
                expirationDate: add(now, {
                    hours: 1,
                }),
                isConfirmed: false
            }
        }
        const createResult = await usersRepository.createUser(user)

        try {
            await emailManager.sendEmailConfirmationMessage(user.accountData.email, user.emailConfirmation.confirmationCode)
        } catch (error) {
            console.error(error)
            return null
        }
        return createResult
    },
    async confirmEmail(code: string) {
        let user = await usersRepository.findUserByConfirmationCode(code)
        if (!user) return false
        if (user.emailConfirmation.isConfirmed) return false
        if (user.emailConfirmation.confirmationCode !== code) return false
        if (user.emailConfirmation.expirationDate < new Date()) return false
        let result = await usersRepository.updateConfirmation(user._id)
        return result
    },
    async resendingEmail(email: string) {
        const user = await usersRepository.findUserWithEmailOrLogin(email)
        if (!user) {
            return
        }
        await usersRepository.updateCode(user._id)
        const updatedUser = await usersRepository.findUserWithEmailOrLogin(email)
        await businessServis.sendEmail(updatedUser!.accountData.email, 'Resending email', ' Resending message', updatedUser?.emailConfirmation.confirmationCode)

    },
    async isPasswordCorrect(password: string, hash: string) {
        const isEqual = await bcrypt.compare(password, hash)
        if (!isEqual) {
            return null
        }
    }
}