import {NextFunction, Request, Response} from "express";
import {ApiRequestModel} from "../../db/api-requests";


export const apiRequestMiddleware = async (req: Request<{},{},{},{}>, res: Response, next: NextFunction) => {
    const IP = req.ip || '1'
    const URL =  req.originalUrl
    const currentDate = new Date()

    const recentRequests = await ApiRequestModel.countDocuments({
        IP,
        URL,
        date: {$gt: new Date(Date.now() - 10000).toISOString()}
    })
    console.log('recentRequests :', recentRequests)
    if (recentRequests >= 5) {
        res.sendStatus(429)
        return
    }
    const newRequest = {
        IP,
        URL: req.originalUrl,
        date: new Date().toISOString()
    }
    await ApiRequestModel.insertOne({...newRequest})

    next()
}