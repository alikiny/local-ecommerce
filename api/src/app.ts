import express from 'express'
import lusca from 'lusca'
import dotenv from 'dotenv'
import passport from 'passport'

import movieRouter from './routers/movie'
import userRouter from './routers/user'
import productRouter from './routers/product'
import categoryRouter from './routers/category'
import colorRouter from './routers/color'
import profileRouter from './routers/profile'
import orderRouter from './routers/orderDetail'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import {googleStrategy} from './config/passport'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3000)

// Global middleware
app.use(apiContentType)
app.use(express.json())
app.use(passport.initialize())
passport.use(googleStrategy)

// Set up routers
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
