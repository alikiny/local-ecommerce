import { Request, Response, NextFunction } from 'express'
import OrderDetailService from '../services/orderDetail'
import OrderDetail from '../models/OrderDetail'
import { BadRequestError} from '../helpers/apiError'

export const createOrderDetail = async ( 
    req: Request,
    res: Response,
    next: NextFunction)=> {
        try {
            console.log(req.body)
        const {product, user} = req.body
        const orderDetail = new OrderDetail({product, user})    
        await OrderDetailService.create(orderDetail)
        res.json(orderDetail)
        } catch (error) {
            if (error instanceof Error && error.name == 'ValidationError') {
                next(new BadRequestError('Invalid Request', error))
              } else {
                next(error)
              } 
        }
    }

export const findOrderById = async( 
    req: Request,
    res: Response,
    next: NextFunction)=> {
        try {
         res.json(await OrderDetailService.findOne(req.params.orderId))   
        } catch (error) {
            if (error instanceof Error && error.name == 'ValidationError') {
                next(new BadRequestError('Invalid Request', error))
              } else {
                next(error)
              }  
        }
    }

export const deleteOrderById = async(
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    try {
        
    } catch (error) {
        
    }
}