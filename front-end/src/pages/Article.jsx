import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NotFound from './NotFound';
import CommentsList from '../components/CommentsList';
import AddComment from '../components/AddComment';
import { link } from '../components/Baselink';
import LikeButton from '../components/LikeButton';

const Article = ({ loggedInUserId }) => {
  const { name } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likedBy, setLikedBy] = useState([]);
  const url = `${link}`;

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const { data } = await axios.post(
          url + '/api/article/getarticle',
          { articleName: name }
        );

        if (data.name === name) {
          setArticle(data);
          setLiked(data.liked);
          setLikedBy(data.likedBy);
        } else {
          setArticle(null);
        }
      } catch (err) {
        console.error('Error fetching article data:', err.message);
        setError(err.message);
      }
    };

    fetchArticleData();
  }, [name]);

  const handleDelete = async () => {
    try {
      await axios.delete(url + '/api/article/deletearticle', { data: { id: article._id } });
      window.location.href = '/article-list'; // Redirect to article list page after deletion
    } catch (err) {
      console.error('Error deleting article:', err.message);
      setError('Failed to delete the article.');
    }
  };

  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;
  if (!article) return <NotFound />;

  const isAuthor = article.author === loggedInUserId;
  const userId = localStorage.getItem("userId");

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 bg-white dark:bg-gray-800 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
        <h1 className="text-gray-900 dark:text-white sm:text-4xl text-2xl font-bold text-center sm:text-left">
          {article.title}
        </h1>
        <div className="flex items-center gap-4">
          <LikeButton 
            articleId={article._id} 
            initialLikes={article.likes || 0}
            initialLikedState={likedBy?.includes(userId)}
          />
          {isAuthor && (
            <div>
              <button
                onClick={() => {
                  window.location.href = `/edit-article/${article._id}`;
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4 sm:mt-0"
              >
                Edit Article
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded ml-4"
              >
                Delete Article
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="prose prose-sm sm:prose-lg mx-auto dark:prose-invert">
        {article.content &&
          article.content.split('\n').map((paragraph, index) => (
            <p
              className="text-base mb-4 leading-relaxed text-gray-800 dark:text-gray-200"
              key={index}
            >
              {paragraph}
            </p>
          ))}
      </div>

      <div className="mt-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Comments
        </h2>
        <CommentsList comments={article.comments || []} />
        <AddComment
          articleName={name}
          setArticleInfo={(info) =>
            setArticle((prev) => ({ ...prev, comments: info.comments }))
          }
        />
      </div>
    </div>
  );
};

export default Article;

