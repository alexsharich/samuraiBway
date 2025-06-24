import {NextFunction, Request, Response} from "express";
import {apiRequestCollection} from "../../repositories/DB";


export const apiRequestMiddleware = async (req: Request<{},{},{},{}>, res: Response, next: NextFunction) => {
    const IP = req.ip || '1'
    const URL =  req.originalUrl
    const currentDate = new Date()

    const recentRequests = await apiRequestCollection.countDocuments({
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
    await apiRequestCollection.insertOne({...newRequest})

    next()
}