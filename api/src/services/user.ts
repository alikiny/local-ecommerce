
import { NotFoundError } from "../helpers/apiError"
import User, { UserDocuments } from "../models/User"

const create = async( user: UserDocuments): Promise<UserDocuments> => {
return user.save()
}

const findOne = async (userId: string): Promise<UserDocuments | null> =>{ 
    const foundUser = User.findById(userId).populate("profile")

    if(!foundUser){
        throw new NotFoundError(`Product ${userId} not found`)
    }
    return foundUser;
}

const update =async (userId: string, update: Partial<UserDocuments>): Promise<UserDocuments | null> => {
    const updateUser = User.findByIdAndUpdate(userId, update, {new: true})
    if(!updateUser) {
        throw new NotFoundError(`Product ${userId} not found`)
    }
    return updateUser;
}
export default {create, findOne, update}