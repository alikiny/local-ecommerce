import express from 'express';
import { currentUserProfile} from '../controllers/profile';
const router = express.Router()


router.get('/me', currentUserProfile)
router.post('/', )
router.get('/', )
router.put('/:id')

export default router;