// import dotenv from 'dotenv';
// import mongoose from 'mongoose';

// // Load environment variables from the .env file
// dotenv.config({ path: "/.env" });

// // Check if CONNECTION_URL exists in the environment variables
// if (!process.env.CONNECTION_URL) {
//     throw new Error("Missing CONNECTION_URL in environment variables");
// }

// console.log("This is env variable:", process.env.CONNECTION_URL);

// const connectDB = async () => {
//     try {
//         const resp = await mongoose.connect(process.env.CONNECTION_URL);
//         if (resp) {
    //             console.log("MongoDB connected");
    //         }
    //     } catch (error) {
//         console.log(error);
//     }
// };

// export { connectDB };

import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Suppress strictQuery warning
        mongoose.set('strictQuery', true);

        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/my_blog', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit the process on failure
    }
};

export default connectDB;


// export default connectDB;


