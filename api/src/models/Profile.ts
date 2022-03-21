import mongoose, {Document} from 'mongoose'

export type ProfileDocuments = Document & {
user: string
city: string
postal: string
address: string
phone: string
}

const profileSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    city: {
        type: String,
        required: true
    },
    postal: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }, 
})
export default mongoose.model('Profile', profileSchema)