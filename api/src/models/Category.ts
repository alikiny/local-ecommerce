import mongoose, {Document} from 'mongoose'

export type CategoryDocments = Document & {
    _id: string,
    category: string
}

const categorySchema = new mongoose.Schema({
    category: {type: String}
})

export default mongoose.model<CategoryDocments>('Category', categorySchema)