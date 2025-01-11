import express from 'express';
import { loginUser, registerUser, getProfile, editProfile, deleteUserAccount } from "../controllers/user.controller.js";
import { genrateOtp, generateOTPForDelete } from '../Utils/otpgenerate.js';
import multer from 'multer'


const upload = multer({storage: multer.memoryStorage()})

const userRouter = express.Router();

// Register route
userRouter.post('/register/generate-otp', genrateOtp);
userRouter.post('/register', registerUser);

// Login route
userRouter.post('/login', loginUser);

// Profile route
userRouter.get('/getProfile', getProfile);

// Edit profile route
userRouter.post('/editProfile', upload.single("picture") , editProfile);

// Delete account route
userRouter.post('/deleteAccount/generate-otp', generateOTPForDelete);
userRouter.delete('/deleteAccount', deleteUserAccount);

export { userRouter };
