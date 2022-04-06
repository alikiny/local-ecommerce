import { Request, Response, NextFunction } from 'express'
import OrderDetailService from '../services/orderDetail'
import OrderDetail from '../models/OrderDetail'
import { BadRequestError} from '../helpers/apiError'
import User from '../models/User'

export const createOrderDetail = async ( 
    req: Request,
    res: Response,
    next: NextFunction)=> {
        try {
        // console.log(req.body)
        const {product, user} = req.body
        const orderDetail = new OrderDetail({product, user})    
        const result = await OrderDetailService.create(orderDetail)
        
        if(result._id) {
            await User.updateOne(
                {_id: user},  
                {$push: {order: result._id}})
        }
        res.json("success")
        

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