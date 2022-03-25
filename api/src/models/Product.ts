
import mongoose, {Document} from 'mongoose'

export type ProductDocuments = Document & {
    _id: string,
    name: string,
    SKU: string,
    image: string,
    price: number,
    size: string,
    sex: string,
    color:string[],
    category: string
    stock: string,
}

const productSchema = new mongoose.Schema({
    name: {type: String, index: true, require: true},
    SKU: {type: String, require: true},
    image: {type: String},
    price: {type: Number, require: true},
    size: {type: String, require: true},
    sex: {type: String, require: true},
    color:{ type: [{type: mongoose.Schema.Types.ObjectId, ref: "Color"}]},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    stock: {type: mongoose.Schema.Types.ObjectId, ref: 'Stock'},
})
export default mongoose.model<ProductDocuments>('Product', productSchema)

