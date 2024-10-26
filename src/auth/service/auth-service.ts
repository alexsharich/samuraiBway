import {LoginInputType} from "../controllers/loginController";
import {usersRepository} from "../../users/repositories/users-repository";
import bcrypt from "bcrypt";

export const authService = {
async loginWithEmailOrLogin({loginOrEmail,password}:LoginInputType){
   const user =  await usersRepository.findUserWithEmailOrLogin(loginOrEmail)
    if (user) {
        // Compare the provided password with the stored hashed password
        const match = await bcrypt.compare(password, user.passwordHash);

        if (match) {
            console.log('Login successful!');
            return true
        } else {
            console.log('Invalid password.');
            return false
        }
    } else {
        console.log('User not found.');
        return false
    }
}
}