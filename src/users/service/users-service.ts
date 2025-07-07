import {InputUserType} from "../../input-output-types/userType";
import bcrypt from 'bcrypt'
import {ObjectId} from "mongodb";
import {v4 as uuidv4} from "uuid";
import {add} from "date-fns/add";
import {UsersRepository} from "../repositories/users-repository";
import {inject, injectable} from "inversify";

@injectable()
export class UsersService {

    constructor(@inject(UsersRepository) private usersRepository: UsersRepository) {
    }

    async createUser(user: InputUserType, isAdmin: boolean = false) {


        const errors = []
        const isUnique = await this.usersRepository.checkUniqUserWithEmailOrLogin(user.login, user.email)
        if (isUnique) {
            if (isUnique.accountData.email === user.email) {
                errors.push({field: 'email', message: 'email should be unique'})
            }
            if (isUnique.accountData.userName === user.login) {
                errors.push({field: 'login', message: 'login should be unique'})
            }
            return errors
        }
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(user.password, salt)
        const now = new Date()

        const newUser = {
            _id: new ObjectId(),
            accountData: {
                userName: user.login,
                email: user.email,
                passwordHash,
                createdAt: new Date()
            },
            emailConfirmation: {
                confirmationCode: uuidv4(),
                expirationDate: add(now, {
                    hours: 1,
                }),
                isConfirmed: isAdmin ? true : false
            }
        }
        return await this.usersRepository.createUser(newUser)
    }

    async deleteUser(id: string): Promise<boolean> {
        return await this.usersRepository.deleteUser(id)
    }
}
