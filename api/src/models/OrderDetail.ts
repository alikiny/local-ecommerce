import mongoose, {Document} from 'mongoose'

export type OrderDetailDocuments = Document & {
_id: string,
product: string[],
user: string
}

const orderDetailSchema = new mongoose.Schema({
    product: {type:[ mongoose.Schema.Types.ObjectId], ref: 'Product' },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

export default mongoose.model<OrderDetailDocuments>('OrderDetail', orderDetailSchema)