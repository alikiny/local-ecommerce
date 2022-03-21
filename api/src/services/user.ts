
import { NotFoundError } from "../helpers/apiError"
import User, { UserDocuments } from "../models/User"

const create = async( user: UserDocuments): Promise<UserDocuments> => {
return user.save()
}

// const update = async(userId: string, update: Partial<UserDocuments>) => {
// const foundUser = await User.findByIdAndUpdate(userId, update, {
//     new: true
// })
// if(!foundUser){
//     throw new NotFoundError(`User ${userId} not found`)
// }
// }

export default {create}