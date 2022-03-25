import mongoose, {Document} from 'mongoose'

export type ProfileDocuments = Document & {
_id: string,
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
        
    },
    postal: {
        type: String,
        
    },
    address: {
        type: String,
        
    },
    phone: {
        type: String,
        
    }, 
})
export default mongoose.model<ProfileDocuments>('Profile', profileSchema)