import dotenv from 'dotenv'
import mongoose from 'mongoose';

dotenv.config({path:"./.env"})


if (!process.env.CONNECTION_URL) {
    console.error("connection url not found , chwck env file")
}
const MONGO_URI = process.env.CONNECTION_URL ;



const connectDB= async () => {
    try {
        const resp =mongoose.connect(MONGO_URI)
        if (resp) {
            console.log("monog db connected")
        }
    } catch (error) {
        console.log(error)
    }
}

export {connectDB}
