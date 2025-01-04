import jwt from 'jsonwebtoken';
import { Article } from '../models/article.model.js';
import { User } from '../models/user.model.js';

const secretKey = process.env.SECRET_KEY;

const addArticle = async (req, res) => {
    try {
        const { title, content, thumbnail } = req.body;
        console.log("addArticle called");

        if(!title || !content || !thumbnail){
            return res.status(400).json({ error: "Title, content, and thumbnail are required." });
        }

        // Set name same as title
        const name = title;

        // Validate Authorization Header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            console.error("Authorization header is missing.");
            return res.status(401).json({ error: "No token provided." });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {   
            console.error("Bearer token is missing.");
            return res.status(401).json({ error: "Invalid token format." });
        }

        // Decode and Verify Token
        let decoded;
        try {
            decoded = jwt.verify(token, secretKey);
        } catch (err) {
            console.error("Error decoding token:", err.message);
            return res.status(401).json({ error: "Invalid or expired token." });
        }

        // Find the authenticated user
        const userId = decoded.userId;
        const user = await User.findById(userId);
        if (!user) {
            console.error(`User with ID ${userId} not found.`);
            return res.status(404).json({ error: "User not found." });
        }

        // Check if an article with the same name already exists
        const existingArticle = await Article.findOne({ name });
        if (existingArticle) {
            return res.status(400).json({ error: "Article with this title already exists." });
        }

        // Create and save the new article
        const newArticle = new Article({
            name, 
            title,
            content,
            thumbnail,
            author: userId,
            comments: [],
        });

        await newArticle.save();

        // Increment the user's article count
        user.articlesPublished += 1;
        await user.save();

        res.status(201).json({ message: "Article created successfully", article: newArticle });
    } catch (error) {
        console.error("Error adding article:", error);
        if (error.code === 11000) {
            return res.status(400).json({ error: "Article with this title already exists" });
        }
        res.status(500).json({ error: "Internal server error" });
    }
};

const getarticles = async (req, res) => {
    try {
        const {articleName} = req.body;
        console.log(articleName)
        const articleInfo = await Article.findOne({ name: articleName });
        if (!articleInfo) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.status(200).json(articleInfo);
    } catch (error) {
        console.error('Error fetching article:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addcomments = async (req, res) => {
    const { username, text } = req.body;
    const { articleName } = req.body;
    console.log(articleName);
    try {
        const articleInfo = await Article.findOne({ name: articleName }); // Using name field

        if (!articleInfo) {
            return res.status(404).json({ error: 'Article not found' });
        }

        articleInfo.comments.push({ username, text });
        const updatedArticleInfo = await articleInfo.save();

        res.status(200).json(updatedArticleInfo);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        if (articles.length === 0) {
            return res.status(404).json({ message: 'No articles found' });
        }
        res.status(200).json(articles);
    } catch (error) {
        console.error('Error fetching all articles:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export { getarticles, addcomments, addArticle, getAllArticles };