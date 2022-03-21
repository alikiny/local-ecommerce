import { Request, Response, NextFunction } from 'express'
import User from '../models/User'
import UserService from '../services/user'
import { BadRequestError } from '../helpers/apiError'
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const config = require('config')

// POST 
//@route api/v1/user
//@desc register user route
//@access Public

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
        try {
            // Get user input
            const {firstName, lastName, email, password} = req.body;

            // Validate user input
            if(!(firstName && lastName && email && password )) {
            //   next(new Error("All inputs are required"))  
             res.status(400).send("All inputs are required")
            }

            // Check if user already exist
            console.log(email)
            const oldUser = await User.findOne({email});

            
            // check if user exist
            if(oldUser) {
                // next(new Error('User Already Exist. Please Login!'))
                return res.status(409).send('User Already Exist. Please Login!');
            } 

            // Encrypt password
            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(password, salt);

            // define current date
            const date = new Date().toUTCString();

            // Create user 
            const user = new User({
                firstName, 
                lastName, 
                email, 
                password: encryptedPassword, 
                registeredDate: date})

            // Save into database 
            await UserService.create(user)

           // res.json(user)
            // return jsonwebtoken
            const payload = {user_id: user._id, email}
            const token = jwt.sign(
                payload, 
                process.env.JWT_SECRET, 
                {expireIn: 360000},
            )
            console.log(token)
            // save user token
            user.token = token
            // return new user
            res.status(201).json(user)
         
            } catch (error) {

                if (error instanceof Error && error.name == 'ValidationError') {
                    next(new BadRequestError('Invalid Request', error))
                } else {
                    next(error)
                } 
            }
}
// PUT /users/:userId
// export const updateUser = async(req: Request,
//     res: Response,
//     next: NextFunction) => {
//         try {
//             const update = req.body
//             const userId = req.params.userId
//             const updateUser = await UserService.update(userId, update)
//             res.json(updateUser)
            
//         } catch (error) {
//             if (error instanceof Error && error.name == 'ValidationError') {
//                 next(new BadRequestError('Invalid Request', error))
//               } else {
//                 next(error)
//               }   
//         }
//     }