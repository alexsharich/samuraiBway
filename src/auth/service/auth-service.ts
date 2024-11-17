import {LoginInputType} from "../controllers/loginController";
import {usersRepository} from "../../users/repositories/users-repository";
import bcrypt from "bcrypt";

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
    }
}