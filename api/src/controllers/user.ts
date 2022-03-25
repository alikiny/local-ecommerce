import { Request, Response, NextFunction } from 'express'
import User from '../models/User'
import UserService from '../services/user'
import { BadRequestError, DuplicateEntityError } from '../helpers/apiError'
import bcrypt from 'bcryptjs'
import { Error } from 'mongoose'
// import jwt from 'jsonwebtoken'
// import config from 'config'
// const jwtKey = "my_secret_key"
// const jwtExpirySeconds = 300

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
            const {firstName, lastName, email, password, profile} = req.body;

            // 1)) check if user exist
            const userExists = await User.findOne({email: email});
            if(userExists) {
              return  next(new DuplicateEntityError("email already exist. Please login!"))
                }
                
            // 2)) Encrypt password
            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(password, salt);

            // define current date
            const date = new Date().toUTCString();

            // Create user 
            const user = new User({
                firstName, 
                lastName, 
                email, 
                profile, 
                password: encryptedPassword,
                registeredDate: date})

            // Save into database 
           await UserService.create(user)
           res.status(201).json(user)

           //Create Token
            // const token = jwt.sign(
            //     {user_id: user._id, email},
            //     jwtKey,
            //     {expiresIn: process.env.JWT_EXPIRES_IN})

            // console.log(token)
            // // save user token
            // user.token = token

            } catch (error) {
                if (error instanceof Error && error.name == 'ValidationError') {
                    next(new BadRequestError('Invalid Request', error))

                } else {
                    next(error)
                } 
            }
}

export const findUserById = async (req: Request,
    res: Response,
    next: NextFunction)=>{
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
export const updateUser = async(
    req: Request,
    res: Response,
    next: NextFunction) => {
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