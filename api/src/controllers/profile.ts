import { Request, Response, NextFunction } from 'express'
import Profile from '../models/Profile'
import ProfileService from '../services/profile'
import { BadRequestError} from '../helpers/apiError'

export const currentUserProfile= async (
    req: Request,
    res: Response,
    next: NextFunction)=> {
try {
    
    
} catch (error) {
    
}
}

export const findAllProfile= async(
  req: Request,
  res: Response,
  next: NextFunction)=> {
    try {
      res.json(await ProfileService.findAll())
      
    } catch (error) {
      if (error instanceof Error && error.name == 'ValidationError') {
        next(new BadRequestError('Invalid Request', error))
      } else {
        next(error) 
      }
    }
  }

export const findProfileById= async (
    req: Request,
    res: Response,
    next: NextFunction)=> {
        try {
          res.json(await ProfileService.findOne(req.params.profileId))

        } catch (error) {
            if (error instanceof Error && error.name == 'ValidationError') {
                next(new BadRequestError('Invalid Request', error))
              } else {
                next(error) 
              }
        }
    }
export const createProfile= async (
    req: Request,
    res: Response,
    next: NextFunction
)=> {
    try {
        console.log(req.body)
        const {user, city, postal, address, phone} = req.body
        const profile = new Profile({user, city, postal, address, phone})
        await ProfileService.create(profile)
        res.json(profile)

    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error))
          } else {
            next(error) 
          }
    }
}

