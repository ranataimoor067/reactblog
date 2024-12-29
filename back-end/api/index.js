import { app } from "../app.js";
import { connectDB } from "../db.js";

export default async (req, res) => {
  try {
    await connectDB();
    console.log("MongoDB initialized");
    app(req, res); // Pass the request/response to the app
  } catch (error) {
    console.error("Cannot connect to DB", error);
    res.status(500).send("Internal Server Error");
  }
};
