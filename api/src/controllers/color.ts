
import {Request, Response, NextFunction } from 'express'
import Color from '../models/Color'
import ColorService from '../services/color'
import { BadRequestError } from '../helpers/apiError'

export const createColor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const colorName = req.body
        const color = new Color(colorName)
        await ColorService.create(color)
        res.status(201).json(color)
    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error))
    
        } else {
            next(error)
        }   
    }
} 

export const findAllColor = async (
    req: Request,
    res: Response,
    next: NextFunction
 ) => {
try {
    res.json(await ColorService.findAll())
} catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
        next(new BadRequestError('Invalid Request', error))
      } else {
        next(error)
      }
}
}