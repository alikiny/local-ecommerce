import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secrets'

const signToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
}
