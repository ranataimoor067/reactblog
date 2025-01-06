import { Router } from "express";
import { getarticles, addcomments,addArticle, getAllArticles, editArticle, getarticlebyid, deleteArticle } from "../controllers/article.controller.js";

const articleRouter = Router()

// add article route
articleRouter.post('/addarticle', addArticle); 

// get article route
articleRouter.post('/getarticle', getarticles);

// get all article route
articleRouter.get('/getallarticle', getAllArticles);

// add comment route
articleRouter.post('/addcomment', addcomments);

//edit article
articleRouter.post('/editarticle', editArticle)

//get article by id
articleRouter.post('/getarticlebyid', getarticlebyid)

// delete article
articleRouter.delete('/deletearticle', deleteArticle);

export { articleRouter };