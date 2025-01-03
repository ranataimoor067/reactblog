import express from 'express';
import { loginUser,registerUser,getProfile, editProfile } from "../controllers/user.controller.js";

const userRouter = express.Router();

// Register route
userRouter.post('/register', registerUser);

// Login route
userRouter.post('/login', loginUser);

// Profile route
userRouter.get('/getProfile', getProfile);

// Edit profile route
userRouter.put('/editProfile', editProfile);

export { userRouter };
