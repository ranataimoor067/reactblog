import { Router } from "express";
import { getarticles, addcomments,addArticle } from "../controllers/article.controller.js";


const articleRouter = Router()

articleRouter.route("/getarticle").post(getarticles)

articleRouter.route("/addcomment").post(addcomments)
articleRouter.route("/addarticle").post(addArticle)

export {articleRouter}