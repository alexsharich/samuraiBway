import {Request,Response} from 'express'

export const cookieExampleControllerPost = async (req: Request, res: Response) => {
    res.cookie('meCookie',value,{httpOnly:true,secure:true})
    res.status(204).send('Hello samurai ! ')
}
