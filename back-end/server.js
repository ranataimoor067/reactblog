import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb';

const app = express();
const PORT = process.env.PORT || 8080

dotenv.config()
const MONGO_URI = process.env.CONNECTION_URL || "mongodb://localhost:27017";
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT"],
    }))
app.use(express.json({extend: false}));

const withDB = async (operations, res) => {
    let client;
    try {
        client = new MongoClient(MONGO_URI);
        await client.connect();
        const db = client.db("blog");
        await operations(db);
    }
    catch (error) {
        console.error('Error in withDB:', error);
        res.status(500).json({message: "Error connecting to database", error});
    }
    finally {
        if (client) {
            await client.close();
        }
    }
}

app.get('/api/articles/:name', async(req, res) => {
    withDB(async(db) => {
        const articleName = req.params.name;
        const articleInfo = await db.collection("articles").findOne({name: articleName})
        res.status(200).json(articleInfo)
    }, res)
});

app.post("/api/articles/:name/add-comments", (req, res) => {
    const {username, text} = req.body;
    const articleName = req.params.name;
    withDB(async(db) => {
        const articleInfo = await db.collection('articles').findOne({name: articleName})
        await db.collection('articles').updateOne({name: articleName} , {
            $set: {
                comments: articleInfo.comments.concat({username, text}),
            },
        }
      );
        const updateArticleInfo = await db.collection("articles").findOne({name: articleName})
        res.status(200).json(updateArticleInfo)
    }, res)
});

app.listen(PORT, () => console.log(`Server started at ${PORT}`));