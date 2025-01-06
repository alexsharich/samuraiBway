import jwt from 'jsonwebtoken'
import {SETTINGS} from "../settings";

export const jwtServise = {
    createToken(userId: string) {
        const token = jwt.sign({userId: userId}, SETTINGS.JWT, {expiresIn: '1h'})
        return token
    },
    decodeToken(token: string) {
        try {
            return jwt.decode(token)
        } catch (error) {
            console.log('Cant decode token', error)
            return null
        }
    },
    verifyToken(token: string) {
        try {
            return jwt.verify(token, SETTINGS.JWT) as { userId: string }
        } catch (error) {
            return null
        }
    }
}