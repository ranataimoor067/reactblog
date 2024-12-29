import { Article } from "../models/article.model.js";


const addArticle = async (req,res) => {
    const { name, title, content } = req.body;

    try {
      // Check if an article with the same name already exists
      const existingArticle = await Article.findOne({ name });
      if (existingArticle) {
        return res.status(400).json({ error: 'Article with this name already exists' });
      }
  
      // Create and save the new article
      const newArticle = new Article({
        name,
        title,
        content,
        comments: [],
      });
  
      await newArticle.save();
      res.status(201).json({ message: 'Article created successfully', article: newArticle });
    } catch (error) {
      console.error('Error adding article:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}

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
}

const addcomments = async (req, res) => {
    const { username, text } = req.body;
    const {articleName }= req.body;
    console.log(articleName)
    try {
        const articleInfo = await Article.findOne({ name: articleName });

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
}

export {getarticles, addcomments, addArticle}