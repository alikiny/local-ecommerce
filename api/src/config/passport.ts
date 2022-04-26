// declearation merging
import GoogleIdTokenStrategy from 'passport-google-id-token'
import JwtStrategy from 'passport-jwt'
import { GOOGLE_CLIENT_ID, JWT_SECRET } from '../util/secrets'
import UserService from '../services/user'

export const googleStrategy = new GoogleIdTokenStrategy(
  {
    clientId: GOOGLE_CLIENT_ID,
  },
  async (parseToken: any, __googleId: any, done: any) => {
    // check user exist in database
    const user = await UserService.findOrCreate(parseToken)

    return done(null, user)
  }
)

export const jwtStrategy = new JwtStrategy.Strategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload: any, done: any) => {
    const email = payload.email
    const user = await UserService.findByEmail(email)

    done(null, user)
  }
)
