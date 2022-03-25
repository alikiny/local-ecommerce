import express from 'express';
import { currentUserProfile, createProfile, findAllProfile, findProfileById} from '../controllers/profile';
const router = express.Router()


router.get('/me', currentUserProfile)
router.post('/', createProfile )
router.get('/', findAllProfile)
router.get('/:profileId', findProfileById)

export default router;