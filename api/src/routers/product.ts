import express from 'express'
import passport from 'passport'
import {
  findAllProducts,
  findProductById,
  updateProduct,
  deleteProduct,
  createProduct,
} from '../controllers/product'
const router = express.Router()

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  findAllProducts
)
router.get('/:productId', findProductById)
router.put('/:productId', updateProduct)
router.delete('/:productId', deleteProduct)
router.post('/', createProduct)

export default router
