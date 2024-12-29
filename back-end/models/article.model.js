import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  text: { type: String, required: true },
});



const articleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  comments: [
    {
      username: { type: String, required: true },
      text: { type: String, required: true },
    },
  ],
});



const Article = mongoose.model('Article', articleSchema);

export {Article};
