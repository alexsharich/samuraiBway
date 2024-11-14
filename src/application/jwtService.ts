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
    verifyToken(token: string)  {
        try {
            const result = jwt.verify(token, SETTINGS.JWT)
            return result
        } catch (error) {
            return null
        }
    }
}