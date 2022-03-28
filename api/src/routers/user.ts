import express from 'express'
import {
  createUser,
  findUserById,
  updateUser,
  googleLogin,
} from '../controllers/user'
import passport from 'passport'
const router = express.Router()

router.post('/sign-up', createUser)
router.get('/:userId', findUserById)
router.put('/:userId', updateUser)
router.post(
  '/google-login',
  passport.authenticate('google-id-token', { session: false }),
  googleLogin
)

export default router
