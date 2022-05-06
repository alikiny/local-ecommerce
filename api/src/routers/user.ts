import express from 'express'
import {
  createUser,
  logInUser,
  getAllUser,
  findUserById,
  updateUser,
  googleLogin,
  getProfile,
  updateAuthenticatedUser,
} from '../controllers/user'
import passport from 'passport'
const router = express.Router()

router.get('/all', getAllUser)
router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  getProfile
)
router.get(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  findUserById
)

router.post('/sign-up', createUser)
router.post('/sign-in', logInUser)
router.post(
  '/google-login',
  passport.authenticate('google-id-token', { session: false }),
  googleLogin
)

router.put('/:userId', updateUser)
router.put(
  '/',
  passport.authenticate('jwt', { session: false }),
  updateAuthenticatedUser
)

export default router
