import React, { useEffect, useState } from 'react';
import Articles from '../components/Articles';
import AddArticleModal from './AddArticle';
import LikeButton from '../components/LikeButton';
import { link } from '../components/Baselink';
import axios from 'axios';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const url = `${link}`;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${url}/api/article/getallarticle`);
        if (response.statusText !== "OK") {
          setError('Error while fetching articles');
        } else {
          console.log(response.data)
          setArticles(response.data);
        }
      } catch (err) {
        setError('Error fetching articles: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    const checkLogin = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkLogin();
    fetchArticles();
  }, []);

  const handleModalClose = () => setShowModal(false);
  const handleArticleSuccess = (newArticle) => {
    alert(`New article "${newArticle.title}" created successfully!`);
    setArticles((prevArticles) => [...prevArticles, newArticle]);
  };


  const userId = localStorage.getItem("userId");

  return (
    <div className="bg-gradient-to-b from-indigo-100 via-purple-100 to-indigo-200 min-h-screen py-10 pt-24">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-8 drop-shadow-lg transform transition-all duration-300 hover:scale-105">
          Articles
        </h1>

        {/* Add New Article Button with Animation */}
        <div className="flex justify-center mb-6">
          {isLoggedIn && (
            <button
  className="relative bg-gradient-to-r    rounded-lg shadow-lg px-4 py-2 transform transition-all duration-300 hover:scale-110 group"
  onClick={() => setShowModal(true)}
>
  <span className="relative z-10">Add New Article</span>
  <span className=" rounded-3xl absolute bottom-0 left-0 w-0 h-1 bg-blue-800 transition-all duration-300 group-hover:w-full"></span>
</button>

          )}
        </div>

        {/* Error Handling */}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            <p>{error}</p>
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center items-center mb-6">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        )}

        {/* Articles List */}
        {!loading && !error && articles.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(article => (
              <div
                key={article._id}
                className="article-card p-6 rounded-xl shadow-lg bg-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-indigo-400 border-2 border-transparent"
              >
                {/* Thumbnail */}
                {article.thumbnail && (
                  <img 
                    src={article.thumbnail} 
                    alt={`${article.title} Thumbnail`} 
                    className="w-full h-48 object-cover rounded-t-lg mb-4 transform transition-transform duration-300 hover:scale-110"
                  />
                )}

                {/* Article Content */}
                <h3 className="font-bold text-lg text-indigo-600 mb-3">{article.title}</h3>
                <p className="text-sm text-gray-600 mb-6">
                  {article.content ? 
                    (article.content.length > 100 ? `${article.content.substring(0, 100)}...` : article.content) 
                    : 'No description available.'}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => window.location.href = `/article/${article.name}`}
                    className="text-blue-500 underline transform transition-all duration-300 hover:scale-110 hover:text-indigo-600"
                  >
                    Read More
                  </button>
                  <div className="flex items-center gap-2">
                    <LikeButton 
                      articleId={article?._id} 
                      initialLikes={article?.likes || 0}
                      initialLikedState={article?.likedBy?.includes(userId)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Articles Found */}
        {!loading && !error && articles.length === 0 && (
          <div className="text-center text-lg text-gray-500">
            No articles found. Be the first to add one!
          </div>
        )}

        {/* Add Article Modal */}
        {showModal && (
          <AddArticleModal
            onClose={handleModalClose}
            onSuccess={handleArticleSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default ArticleList;
 