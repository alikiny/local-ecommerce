import mongoose, {Document} from 'mongoose'

export type ColorDocments = Document & {
    _id: string,
    color: string
}

const colorSchema = new mongoose.Schema({
    color: {type: String}
})

export default mongoose.model<ColorDocments>('Color', colorSchema)