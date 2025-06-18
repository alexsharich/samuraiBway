import jwt, {JwtPayload} from 'jsonwebtoken'
import {SETTINGS} from "../settings";


interface MyJwtPayload extends JwtPayload {
    userId: string
    deviceId: string
}

export const jwtServise = {
    createToken(userId: string,deviceId:string) {
        const accessToken = jwt.sign({userId}, SETTINGS.JWT_ACCESS, {expiresIn: '10s'})
        const refreshToken = jwt.sign({userId,deviceId}, SETTINGS.JWT_REFRESH, {expiresIn: '20s'})
        return {accessToken, refreshToken}
    },
    decodeToken(token: string) {
        try {
            return <MyJwtPayload>jwt.decode(token)
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
            return <MyJwtPayload>jwt.verify(token, SETTINGS.JWT_ACCESS)
        } catch (error) {
            return null
        }
    }
}