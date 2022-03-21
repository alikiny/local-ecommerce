import mongoose, {Document} from 'mongoose'
const validator = require('validator');

export type UserDocuments = Document & {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
    registeredDate: Date
    token: string
    
}
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
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    registeredDate: {
        type: Date
    },
   
})

export default mongoose.model<UserDocuments>('User', userSchema)