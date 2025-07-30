import jwt, {JwtPayload} from 'jsonwebtoken'
import {SETTINGS} from "../settings";


interface MyJwtPayload extends JwtPayload {
    userId: string
    deviceId: string
}

export class JwtService {
    createToken(userId: string, deviceId?: string) {
        const accessToken = jwt.sign({userId}, SETTINGS.JWT_ACCESS, {expiresIn: '300s'})
        const refreshToken = jwt.sign({userId, deviceId}, SETTINGS.JWT_REFRESH, {expiresIn: '600s'})
        return {accessToken, refreshToken}
    }

    decodeToken(token: string) {
        try {
            return <MyJwtPayload>jwt.decode(token)
        } catch (error) {
            console.log('Cant decode token', error)
            return null
        }
    }

    verifyRefreshToken(token: string) {
        try {
            return <MyJwtPayload>jwt.verify(token, SETTINGS.JWT_REFRESH)
        } catch (error) {
            return null
        }
    }

    verifyToken(token: string) {
        try {
            return <MyJwtPayload>jwt.verify(token, SETTINGS.JWT_ACCESS)
        } catch (error) {
            console.log('ERRRRRROR', error)
            return null
        }
    }
}