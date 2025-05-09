import jwt from 'jsonwebtoken'
import {SETTINGS} from "../settings";

export const jwtServise = {
    createToken(userId: string) {
        const accessToken = jwt.sign({userId: userId}, SETTINGS.JWT_ACCESS, {expiresIn: '1h'})
        const refreshToken = jwt.sign({userId: userId}, SETTINGS.JWT_REFRESH, {expiresIn: '3d'})
        return {accessToken, refreshToken}
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