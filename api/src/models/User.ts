import mongoose, {Document} from 'mongoose'
const validator = require('validator');

export type UserDocuments = Document & {
    _id: string,
    firstName: string
    lastName: string
    email: string
    password: string
    registeredDate: Date
    token: string
    profile?: {address: string, phone: string} 
    order: string[]
    image: string
}
// User model entity
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please tell us your first name!']
    },
    lastName: {
        type: String,
        require: [true, 'Please tell your last name!']
    },
    email: {
        type: String,
        require: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String
        // required: [false, 'Please provide a password'],
        // minlength: 8,
        // select: false
    },
    image: {type: String},
    registeredDate: {
        type: Date
    },
    profile: {
        address: {type: String},
        phone: {type: String}
},
    order: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'OrderDetail'}]}
})

export default mongoose.model<UserDocuments>('User', userSchema)