import bcrypt from "bcrypt";
import {ObjectId} from "mongodb";
import {v4 as uuidv4} from 'uuid'
import {add} from "date-fns/add";
import {UsersRepository} from "../../users/repositories/users-repository";
import {EmailManager} from "../../managers/emailManager";
import {BusinessService} from "../../domain/businessServis";
import {LoginInputType} from "../controllers/auth.controller";
import {UserAccountDBType, UserModel} from "../../db/user-db-type";
import {emailExamples} from "../../helpers/emailTemplates";
import {inject, injectable} from "inversify";
import {UsersQueryRepository} from "../../users/repositories/users-query-repository";


@injectable()
export class AuthService {

    constructor(@inject(UsersRepository) private usersRepository: UsersRepository,
                @inject(EmailManager) private emailManager: EmailManager,
                @inject(BusinessService) private businessService: BusinessService,
                @inject(UsersQueryRepository) private usersQueryRepository: UsersQueryRepository) {
    }

    async loginWithEmailOrLogin({loginOrEmail, password}: LoginInputType): Promise<string | null> {
        const user = await this.usersRepository.findUserWithEmailOrLogin(loginOrEmail)
        if (!user) {
            console.log('User not found.');
            return null
        }
        const match = await bcrypt.compare(password, user.accountData.passwordHash);
        if (!match) {
            return null
        }
        return String(user._id)
    }

    async createUser(login: string, email: string, password: string) {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt)
        const now = new Date()
        const user: UserAccountDBType = {
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
        const createResult = await this.usersRepository.createUser(user)

        try {
            this.emailManager.sendEmailConfirmationMessage(user.accountData.email, user.emailConfirmation.confirmationCode)
        } catch (error) {
            console.error(error)
            return null
        }
        return createResult
    }

    async newPassword(newPassword: string, recoveryCode: string) {

        const user = await this.usersQueryRepository.findUserByRecoveryCode(recoveryCode)
        if (!user) {
            return false
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(newPassword, salt)
        return await this.usersRepository.newPassword(user._id, passwordHash)
    }

    async recoveryCode(userId: ObjectId, email: string) {
        const codeRecovrey = uuidv4()
        await this.usersRepository.addRecoveryCode(userId, codeRecovrey)
        await this.businessService.sendEmail(email, 'recovery', 'recovery text message', emailExamples.passwordRecoveryEmail(codeRecovrey))
    }

    async confirmEmail(code: string) {
        //let user = await this.usersRepository.findUserByConfirmationCode(code)
        const user = await UserModel.findOne({'emailConfirmation.confirmationCode': code}).exec()
        if (!user) return false
        if (user.emailConfirmation.isConfirmed) return false
        if (user.emailConfirmation.confirmationCode !== code) return false
        if (user.emailConfirmation.expirationDate < new Date()) return false
        //return await this.usersRepository.updateConfirmation(user._id)
        //const result = await usersCollection.updateOne({_id: userId}, {$set: {'emailConfirmation.isConfirmed': true}})

        user.emailConfirmation.isConfirmed = true
        await this.usersRepository.save(user)
        return true
    }

    async resendingEmail(email: string) {
        const user = await this.usersRepository.findUserWithEmailOrLogin(email)
        if (!user || user.emailConfirmation.isConfirmed) {
            return null
        }
        await this.usersRepository.updateCode(user._id)
        const updatedUser = await this.usersRepository.findUserWithEmailOrLogin(email)
        this.businessService.sendEmail(updatedUser!.accountData.email, 'Resending email', ' Resending message', emailExamples.registrationEmail(updatedUser?.emailConfirmation.confirmationCode))
        return true
    }
}