import express from 'express'
import lusca from 'lusca'
import dotenv from 'dotenv'
import passport from 'passport'
import cors from 'cors'

import movieRouter from './routers/movie'
import userRouter from './routers/user'
import productRouter from './routers/product'
import categoryRouter from './routers/category'
import colorRouter from './routers/color'
import profileRouter from './routers/profile'
import orderRouter from './routers/orderDetail'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import { googleStrategy, jwtStrategy } from './config/passport'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3000)

// Global middleware
app.use(cors())
app.use(apiContentType)
app.use(express.json())

// Passport configuration
app.use(passport.initialize())
passport.use(googleStrategy)
passport.use(jwtStrategy)

// Set up routers
app.get('/abc', (req, res) => {
  res.send('hello world')
})
app.use('/api/v1/movies', movieRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/category', categoryRouter)
app.use('/api/v1/color', colorRouter)
app.use('/api/v1/profile', profileRouter)
app.use('/api/v1/order', orderRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
