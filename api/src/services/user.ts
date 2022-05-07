import { NotFoundError } from '../helpers/apiError'
import User, { UserDocuments } from '../models/User'

const create = async (userDocument: UserDocuments): Promise<UserDocuments> => {
  return userDocument.save()
}

const findAll = async (): Promise<UserDocuments[]> => {
  const allUserList = User.find()
  if (!allUserList) {
    throw new NotFoundError('User list is empty')
  }
  return allUserList
}

const findOrCreate = async (parsedToken: any) => {
  const found = await User.findOne({ email: parsedToken.payload.email })

  if (!found) {
    // define current date
    const date = new Date().toUTCString()

    const user = new User({
      firstName: parsedToken.payload.given_name,
      lastName: parsedToken.payload.family_name,
      email: parsedToken.payload.email,
      image: parsedToken.payload.picture,
      registeredDate: date,
      order: [],
      profile: { address: '', phone: '' },
    })
    return user.save()
  }
  return found
}

const findProfile = async (userId: any) => {
  const found = await User.findById(userId)
  if (!found) {
    throw new NotFoundError('User not found')
  }

  return found
}

const findByEmail = async (email: string) => {
  const found = User.findOne({ email })
  if (!found) {
    throw new NotFoundError('User not found')
  }

  return found
}

const findOne = async (userId: string): Promise<UserDocuments | null> => {
  const foundUser = User.findById(userId).populate('profile')

  if (!foundUser) {
    throw new NotFoundError(`Product ${userId} not found`)
  }
  return foundUser
}

const update = async (
  userId: string,
  update: Partial<UserDocuments>
): Promise<UserDocuments | null> => {
  const updateUser = User.findByIdAndUpdate(userId, update, { new: true })
  if (!updateUser) {
    throw new NotFoundError(`Product ${userId} not found`)
  }
  return updateUser
}

const updateAuthenticated = async (update: UserDocuments) => {
  console.log(update._id)

  const updated = await User.findByIdAndUpdate(update._id, update, {
    new: true,
  })

  if (!updated) {
    throw new NotFoundError(`User of ${update._id} is not found`)
  }
  return updated
}

export default {
  create,
  findAll,
  findOne,
  update,
  findOrCreate,
  findByEmail,
  findProfile,
  updateAuthenticated,
}
