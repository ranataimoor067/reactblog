const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000
const {MongoClient} = require("mongodb");



app.use(express.json({extend: false}));

const withDB = async(operations, res) => {
	try {
		const client = await MongoClient.connect('mongodb://localhost:27017');
		const db = client.db("blog");
		await operations(db);
		client.close();
	}
	catch (error) {
		res.status(500).json({message: "Error connection to database", error});
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
				coments: articleInfo.comments.concat({username, text}),
			},
		}
	  );
		const updateArticleInfo = await db.collection('articles').findOne({name: articleName})
		res.status(200).json(updateArticleInfo)
	}, res)
});

app.listen(PORT, () => console.log(`Server started at ${PORT}`));