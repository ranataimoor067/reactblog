import { Router } from "express";
import { loginUser,registerUser,getProfile } from "../controllers/user.controller.js";


const userRouter = Router()


userRouter.route("/register").post(registerUser)
userRouter.route("/login").post(loginUser)
userRouter.route("/getProfile").get(getProfile)

export {userRouter}