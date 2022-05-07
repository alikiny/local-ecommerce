import express from 'express'
import {
  createOrderDetail,
  getAllOrder,
  findOrderById,
  deleteOrderById,
} from '../controllers/orderDetail'

const router = express.Router()

router.post('/', createOrderDetail)
router.get('/all', getAllOrder)
router.get('/:orderId', findOrderById)
router.get('/:orderId', deleteOrderById)

export default router
