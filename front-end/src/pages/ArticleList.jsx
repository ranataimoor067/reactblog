import React, { useEffect, useState } from 'react';
import Articles from '../components/Articles';
import AddArticleModal from './AddArticle';
import LikeButton from '../components/LikeButton';
import { link } from '../components/Baselink';
import axios from 'axios';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // State for sorting
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const url = `${link}`;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${url}/api/article/getallarticle`);
        if (response.status !== 200) {
          setError('Error while fetching articles');
        } else {
          const fetchedArticles = response.data;
          console.log(fetchedArticles)
          setArticles(fetchedArticles);
          setFilteredArticles(sortArticles(fetchedArticles, sortBy));
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

  useEffect(() => {
    setFilteredArticles(sortArticles(articles, sortBy));
  }, [articles, sortBy]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredArticles(
      sortArticles(
        articles.filter((article) =>
          article.title.toLowerCase().includes(query) ||
          article.content?.toLowerCase().includes(query)
        ),
        sortBy
      )
    );
  };

  const sortArticles = (articles, sortOrder) => {
    return [...articles].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setFilteredArticles(sortArticles(filteredArticles, e.target.value));
  };

  const handleModalClose = () => setShowModal(false);

  const handleArticleSuccess = (newArticle) => {
    alert(`New article "${newArticle.title}" created successfully!`);
    setArticles((prevArticles) => [...prevArticles, newArticle]);
    setFilteredArticles(
      sortArticles([...filteredArticles, newArticle], sortBy)
    );
  };

  const userId = localStorage.getItem('userId');

  return (
    <div className="bg-gradient-to-b from-indigo-100 via-purple-100 to-indigo-200 min-h-screen py-10 pt-24">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-8 drop-shadow-lg transform transition-all duration-300 hover:scale-105">
          Articles
        </h1>

        {/* Search and Sort Controls */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-colors"
          />
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="ml-4 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-colors"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
        {/* Add New Article Button */}
        {isLoggedIn && (
          <div className="flex justify-center mb-6">
            <button
              className="relative bg-gradient-to-r rounded-lg shadow-lg px-4 py-2 transform transition-all duration-300 hover:scale-110 group"
              onClick={() => setShowModal(true)}
            >
              <span className="relative z-10">Add New Article</span>
              <span className="rounded-3xl absolute bottom-0 left-0 w-0 h-1 bg-blue-800 transition-all duration-300 group-hover:w-full"></span>
            </button>
          </div>
        )}


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
        {!loading && !error && filteredArticles.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
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
                  {article.content
                    ? article.content.length > 100
                      ? `${article.content.substring(0, 100)}...`
                      : article.content
                    : 'No description available.'}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => (window.location.href = `/article/${article.name}`)}
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
        {!loading && !error && filteredArticles.length === 0 && (
          <div className="text-center text-lg text-gray-500">
            No articles found. Try a different search.
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
