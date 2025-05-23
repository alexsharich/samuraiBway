import jwt from 'jsonwebtoken'
import {SETTINGS} from "../settings";

export const jwtServise = {
    createToken(userId: string) {
        const accessToken = jwt.sign({userId: userId}, SETTINGS.JWT_ACCESS, {expiresIn: '10s'})
        const refreshToken = jwt.sign({userId: userId}, SETTINGS.JWT_REFRESH, {expiresIn: '20s'})
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
    verifyRefreshToken(token: string) {
        try {
            return jwt.verify(token, SETTINGS.JWT_REFRESH) as { userId: string }
        } catch (error) {
            return null
        }
    },
    verifyToken(token: string) {
        try {
            return jwt.verify(token, SETTINGS.JWT_ACCESS) as { userId: string }
        } catch (error) {
            return null
        }
    }
}