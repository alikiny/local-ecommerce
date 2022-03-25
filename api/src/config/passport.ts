import passport from 'passport'

import passportLocal from 'passport-local'
import GoogleTokenStrategy from 'passport-google-id-token'
import { GOOGLE_CLIENT_ID} from '../util/secrets'

import { Request, Response, NextFunction } from 'express'

//const LocalStrategy = passportLocal.Strategy

export const googleStrategy = new GoogleTokenStrategy(
    {
    clientId: GOOGLE_CLIENT_ID,
    },
    (parseToken: any, googleId: any, done: any)=> {
        console.log('parse token', parseToken)
        console.log('google id', googleId)
        return done(null, {})

    }

    )

  