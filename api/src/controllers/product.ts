import { Request, Response, NextFunction } from 'express'
import Product from '../models/Product'
import ProductService from '../services/product'
import { BadRequestError} from '../helpers/apiError'

export const createProduct = async ( 
    req: Request,
    res: Response,
    next: NextFunction)=> {
    try {
        const { name, SKU, price, size, sex, color, category, image, stock} = req.body

    const product = new Product({
        name, 
        SKU, 
        price, 
        size, 
        sex, 
        color, 
        category, 
        image,
        stock
    })
    await ProductService.create(product)
    res.json(product)

    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error))
          } else {
            next(error)
          }
    }
}

export const updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
)=> {
    try {
    const update = req.body
    const productId = req.params.productId
    const updateProduct = await ProductService.updateProduct(productId, update)
    
    res.json(updateProduct)

    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error))
          } else {
            next(error)
          }   
    }
}

export const deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
)=> {
    try {
        await ProductService.deleteProduct(req.params.productId)
        res.status(204).end()
    } catch (error) {
        
    }
}
export const findProductById = async(
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        res.json(await ProductService.findOne(req.params.productId))

    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error))
          } else {
            next(error)
          }  
    }
}

// GET all product
export const findAllProducts = async(
    req: Request,
    res: Response,
    next: NextFunction)=> {
        try {

            res.json(await ProductService.findAll())  
        } catch (error) {
            if (error instanceof Error && error.name == 'ValidationError') {
                next(new BadRequestError('Invalid Request', error))
              } else {
                next(error)
              } 
        }

}