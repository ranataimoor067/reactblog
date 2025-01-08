import { Router } from "express";
import { getarticles, addcomments,addArticle, getAllArticles, editArticle, getarticlebyid, deleteArticle, getarticlesbyuser, likeArticle } from "../controllers/article.controller.js";
import multer from 'multer'
import { upload_on_cloudinary } from "../utils/cloudinary.js";

const upload = multer({storage: multer.memoryStorage()})
const articleRouter = Router()

// add article route
articleRouter.post('/addarticle', upload.single("thumbnail"), addArticle); 

// get article route
articleRouter.post('/getarticle', getarticles);

// get all article route
articleRouter.get('/getallarticle', getAllArticles);

//get article by specfic user
articleRouter.post("/getarticlesbyuser", getarticlesbyuser)

// add comment route
articleRouter.post('/addcomment', addcomments);

//edit article
articleRouter.post('/editarticle', upload.single("thumbnail") ,editArticle)

//get article by id
articleRouter.post('/getarticlebyid', getarticlebyid)

// delete article
articleRouter.delete('/deletearticle', deleteArticle);

// Like/Unlike article route
articleRouter.post('/like/:articleId', likeArticle);
    
export { articleRouter };