import express from 'express';
import { loginUser,registerUser,getProfile } from "../controllers/user.controller.js";

const userRouter = express.Router();

// Register route
userRouter.post('/register', registerUser);

// Login route
userRouter.post('/login', loginUser);

// Profile route
userRouter.get('/getProfile', getProfile);

export { userRouter };
