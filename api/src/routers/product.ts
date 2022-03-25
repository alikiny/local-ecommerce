import express from 'express';
import { findAllProducts, findProductById, updateProduct, deleteProduct, createProduct } from '../controllers/product';
const router = express.Router()

router.get('/', findAllProducts)
router.get('/:productId', findProductById)
router.put('/:productId', updateProduct)
router.delete('/:productId', deleteProduct)
router.post('/', createProduct)



export default router;