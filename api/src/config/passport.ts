import passport from 'passport'

import passportLocal, { Strategy } from 'passport-local'

// declearation merging
import GoogleIdTokenStrategy from 'passport-google-id-token'
import JwtStrategy from 'passport-jwt'
import ExtractJwt from 'passport-jwt'
import { GOOGLE_CLIENT_ID, JWT_SECRET } from '../util/secrets'

import { Request, Response, NextFunction } from 'express'

//const LocalStrategy = passportLocal.Strategy

export const googleStrategy = new GoogleIdTokenStrategy(
  {
    clientId: GOOGLE_CLIENT_ID,
  },
  (parseToken: any, googleId: any, done: any) => {
    console.log('parse token', parseToken)
    console.log('google id', googleId)
    // const user = await new User.findorCreate(parsedToken)
    // check user exist in database
    const user = {
      firstName: 'Rajeev',
      lastName: 'sah',
      email: 'rajeev@user.com',
    }
    return done(null, user)
  }
)

export const jwtStrategy = new JwtStrategy.Strategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  (payload: any, done: any) => {
    console.log('payload: ', payload, 'done: ', done)
    done(null, {})
  }
)
