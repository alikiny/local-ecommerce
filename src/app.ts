import express from 'express'
import compression from 'compression'
import session from 'express-session'
import bodyParser from 'body-parser'
import lusca from 'lusca'
import flash from 'express-flash'
import path from 'path'
import mongoose from 'mongoose'
import passport from 'passport'
import dotenv from 'dotenv'

import movieRouter from './routers/movie'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3000)

// Use common 3rd-party middlewares
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))

// Use movie router
app.use('/api/v1/movies', movieRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
