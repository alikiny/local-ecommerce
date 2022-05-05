import { Request, Response, NextFunction } from 'express'
import User, { UserDocuments } from '../models/User'
import UserService from '../services/user'
import { BadRequestError, DuplicateEntityError } from '../helpers/apiError'
import bcrypt from 'bcryptjs'
import { Error } from 'mongoose'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secrets'
import { request } from 'http'

// POST
//@route api/v1/user
//@desc sign-up route
//@ access Public

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // destructure req.body object
    const { firstName, lastName, email, password } = req.body
    console.log('req.body', req.body)
    // 1)) check if user exist
    const userExists = await User.findOne({ email: email })
    if (userExists) {
      return next(
        new DuplicateEntityError('email already exist. Please login!')
      )
    }

    // 2)) Encrypt password
    const salt = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(password, salt)

    // define current date
    const date = new Date().toUTCString()

    // Create user
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      image: '',
      registeredDate: date,
      order: [],
      profile: { address: '', phone: '' },
      password: encryptedPassword,
    })

    // Save into database
    await UserService.create(user)
    const token = jwt.sign({ email: user?.email }, JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })
    res.status(201).json({ user, token })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
export const logInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    const foundUser = await UserService.findByEmail(email)

    if (!foundUser) {
      return res.status(400).json({ error: [{ msg: 'invalid Credentials' }] })
    }
    const isMatched = await bcrypt.compare(password, foundUser.password)

    if (!isMatched) {
      return res.status(400).json({ error: [{ msg: 'invalid Credentials' }] })
    }

    const token = jwt.sign({ email: foundUser?.email }, JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })

    res.json({ foundUser, token })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const findUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findOne(req.params.userId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
// PUT /users/:userId
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const userId = req.params.userId
    const updateUser = await UserService.update(userId, update)
    res.json(updateUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const updateAuthenticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('updateAuthenticateUser:', req.body)
    const updated = await UserService.updateAuthenticated(req.body)
    res.json(updated)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const googleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user ? (req.user as UserDocuments) : null

    const token = jwt.sign({ email: user?.email }, JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })

    res.json({ user, token })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('getprofile', req.user)
    res.json(await UserService.findProfile((req.user as UserDocuments)._id))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
