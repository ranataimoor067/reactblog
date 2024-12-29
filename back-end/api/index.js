// // import { app } from "../app.js";
// import { app } from "../app.js";
// // import { connectDB } from "../db.js";
// import { connectDB } from "../db.js";
// const port = 3000

// try {
//   connectDB()
//   .then(()=>{
//     console.log("mongodb initialized")
//     app.listen(port,()=>`server running at ${port}`)
//   })
// } catch (error) {
//   console.error("cannot connect to db, check app.js trycach block")
// }


// const express = require("express");
import express from 'express'
const app = express();

app.get("/", (req, res) => res.send("Express on Vercel"));
app.get('/test',(req,res)=>{res.send("THIS IS TESTOINg")})
app.get("/test2",(req,res)=>res.send("this is also tesing"))

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;