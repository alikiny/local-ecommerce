import { NotFoundError } from '../helpers/apiError'
import OrderDetail, { OrderDetailDocuments } from '../models/OrderDetail'

const create = async (
  order: OrderDetailDocuments
): Promise<OrderDetailDocuments> => {
  return order.save()
}

const findAll = async () => {
  const allOrderList = OrderDetail.find().populate('user').populate('product')
  if (!allOrderList) {
    throw new NotFoundError('Order list not found')
  }
  return allOrderList
}

const findOne = async (
  orderId: string
): Promise<OrderDetailDocuments | null> => {
  const foundOrder = OrderDetail.findById(orderId)
    .populate({ path: 'product', populate: { path: 'color category' } })
    .populate('user')

  if (!foundOrder) {
    throw new NotFoundError(`Order ${orderId} not found`)
  }
  return foundOrder
}

const deleteOne = async (
  orderId: string
): Promise<OrderDetailDocuments | null> => {
  const foundOrder = OrderDetail.findByIdAndDelete(orderId)

  if (!foundOrder) {
    throw new NotFoundError(`Product ${orderId} not found`)
  }
  return foundOrder
}

export default { create, findAll, findOne, deleteOne }
