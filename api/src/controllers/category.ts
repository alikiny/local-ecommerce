import { Request, Response, NextFunction } from 'express'
import Category from '../models/Category'
import CategoryService from '../services/category'
import { BadRequestError} from '../helpers/apiError'

export const createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction 
) => {
try {
    const categoryName = req.body
    const category = new Category(categoryName)
    await CategoryService.create(category)
    res.status(201).json(category)
} catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
        next(new BadRequestError('Invalid Request', error))

    } else {
        next(error)
    } 
}
}

export const findAllCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
try {
    res.json(await CategoryService.findAll())
} catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
        next(new BadRequestError('Invalid Request', error))
      } else {
        next(error)
      }
}
}