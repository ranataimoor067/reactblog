import { Router } from "express";
import { getarticles, addcomments,addArticle, getAllArticles } from "../controllers/article.controller.js";


const articleRouter = Router()

articleRouter.route("/getarticle").post(getarticles)
articleRouter.route("/getallarticle").get(getAllArticles)
articleRouter.route("/addcomment").post(addcomments)
articleRouter.route("/addarticle").post(addArticle)

export {articleRouter}