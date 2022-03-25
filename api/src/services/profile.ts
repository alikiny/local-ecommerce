import { NotFoundError } from '../helpers/apiError';
import Profile, {ProfileDocuments} from '../models/Profile'

 export const create = async (profile: ProfileDocuments): Promise<ProfileDocuments> => {
return profile.save()
}

export const findAll = async(): Promise<ProfileDocuments[]> => {
    return Profile.find()
}

export const findOne = async (profileId: string): Promise<ProfileDocuments | null> => {
    const foundProfile = Profile.findById(profileId)

    if(!foundProfile) {
        throw new NotFoundError(`Profile ${profileId} not found`)
    }
    return foundProfile;    
}
export default {create, findAll, findOne}