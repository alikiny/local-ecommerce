import { Request, Response, NextFunction } from 'express'
import Profile from '../models/Profile'

export const currentUserProfile= async (req: Request,
    res: Response,
    next: NextFunction)=> {
try {
    const profile = await Profile.findOne().select('__v')
    
} catch (error) {
    
}
}

