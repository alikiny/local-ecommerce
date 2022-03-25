import express from 'express';
import { createUser, findUserById , updateUser} from '../controllers/user';
const router = express.Router()

router.post('/sign-up', createUser)
router.get('/:userId', findUserById )
router.put('/:userId', updateUser)


export default router;