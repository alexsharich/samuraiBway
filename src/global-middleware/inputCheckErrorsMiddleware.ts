import {Response, Request, NextFunction} from 'express'
import {validationResult} from 'express-validator'
import {FieldNamesType, OutputErrorsType} from '../input-output-types/output-errors-type'

export const inputCheckErrorsMiddleware = (req: Request, res: Response<OutputErrorsType>, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const eArray = errors.array({onlyFirstError: true}) as { path: FieldNamesType, msg: string }[]
        // console.log(eArray)

        res
            .status(400)
            .json({
                errorsMessages: eArray.map(error => ({
                    field: error.path,
                    message: error.msg
                }))
            })
        return
    }

    next()
}