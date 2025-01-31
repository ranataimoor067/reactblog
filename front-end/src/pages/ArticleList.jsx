import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Articles from '../components/Articles';
import AddArticleModal from './AddArticle';
import LikeButton from '../components/LikeButton';
import { link } from '../components/Baselink';
import NoarticleImage from '../assets/noarticle.png'
import axios from 'axios';
import Markdown from 'react-markdown';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // State for sorting
  const [tagby, setTagby] = useState(null)
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
        setError(response.data.status === 404 ? null : err.message);
        console.log(error)
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
      switch (sortOrder) {
        case 'most-liked':
          return (b.likes || 0) - (a.likes || 0);
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setFilteredArticles(sortArticles(filteredArticles, e.target.value));
  };

  const handletagchange=async(e)=>{
    setTagby(e.target.value)
    console.log(e.target.value)
    const resp = await axios.post(`${url}/api/article/getarticlebytag`, { tag: e.target.value })
    // console.log(resp.data.articles)
    console.log(resp.data)
    if (resp.data.success) {
      setArticles(resp.data.articles)
    }else{
      setArticles([])
    }
    // setArticles(resp.data.articles)
  }

  const handleModalClose = () => setShowModal(false);

  const handleArticleSuccess = (newArticle) => {
    alert(`New article "${newArticle.title}" created successfully!`);
    setArticles((prevArticles) => [...prevArticles, newArticle]);
    setFilteredArticles(
      sortArticles([...filteredArticles, newArticle], sortBy)
    );
  };

  const handleTagclick = async (tag) => {
    const resp = await axios.post(`${url}/api/article/getarticlebytag`, { tag: tag })
    console.log(resp.data)
    setArticles(resp.data.articles)
  }

  const userId = localStorage.getItem('userId');

  return (
    <div className="bg-gradient-to-b from-indigo-100 via-purple-100 to-indigo-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 min-h-screen py-10 pt-24">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center text-indigo-800 dark:text-indigo-400 mb-8 drop-shadow-lg transform transition-all duration-300 hover:scale-105">
          Articles
        </h1>

        {/* Search and Sort Controls */}  
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full max-w-md px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-colors dark:bg-gray-700 dark:text-gray-200"
          />

          <div>
            <select
              className="ml-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-colors dark:bg-gray-700 dark:text-gray-200"
              value={tagby}
              onChange={handletagchange}
            >
              <option value="Tech">Technology</option>
              <option value="Music">Music</option>
              <option value="Game">Gaming</option>
              <option value="Movies">Movies</option>
              <option value="Books">Books</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Fashion">Fashion</option>
              <option value="Health">Health</option>
              <option value="Sports">Sports</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Finance">Finance</option>
              <option value="Politics">Politics</option>
              <option value="Narratives">Narratives</option>
              <option value="Trending-Topics">Trending-Topics</option>

            </select>

            <select
              value={sortBy}
              onChange={handleSortChange}
              className="ml-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-colors dark:bg-gray-700 dark:text-gray-200"
            >
              <option value="most-liked">Most Liked</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="more than 500 words">More than 500 words</option>
              <option value="less than 500 words">Less than 500 words</option>
              <option value="more than 1000 words">More than 1000 words</option>
              <option value="less than 1000 words">Less than 1000 words</option>
            </select>
          </div>
        </div>
        {/* Add New Article Button */}
        {isLoggedIn && (
          <div className="flex justify-center mb-6">
            <button
              className="relative bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white rounded-lg shadow-lg px-4 py-2 transform transition-all duration-300 hover:scale-110 group"
              // onClick={() => setShowModal(true)}
              onClick={()=> window.location.href="/addarticle"}
            >
              <span className="relative z-10">Add New Article</span>
              <span className="rounded-3xl absolute bottom-0 left-0 w-0 h-1 bg-blue-800 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
          </div>
        )}


        {/* Error Handling */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-4 rounded-lg mb-6">
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
                className="article-card p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-indigo-400 border-2 border-transparent"
              >
                {/* Thumbnail */}
                {article.thumbnail && (
                  <img
                    src={article.thumbnail}
                    alt={`${article.title} Thumbnail`}
                    className="w-full h-48 object-cover rounded-t-lg mb-4 transform transition-transform duration-300 hover:scale-110"
                  />
                )}
                {/* tag */}
                <div className={`w-fit mx-auto text-xs ${article.tag ? "bg-blue-400 dark:bg-blue-600 px-3 py-2 rounded-2xl" : ""}`}>
                  <button onClick={() => handleTagclick(article.tag)}>{article.tag ? article.tag : ""}</button>
                </div>
                {/* Article Content */}
                <h3 className="font-bold text-lg text-indigo-600 dark:text-indigo-300 mb-3">{article.title}</h3>
                <Markdown className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                  {article.content
                    ? article.content.length > 100
                      ? `${article.content.substring(0, 100)}...`
                      : article.content
                    : 'No description available.'}
                </Markdown>
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => (window.location.href = `/article/${article.name}`)}
                    className="text-blue-500 dark:text-blue-400 underline transform transition-all duration-300 hover:scale-110 hover:text-indigo-600 dark:hover:text-indigo-300"
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
          <div className="text-center">
            <img
              src={NoarticleImage}
              alt="No articles found"
              className="mx-auto w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 animate-float"
            />
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 animate-fadeIn">
              <span className="block font-semibold text-indigo-600 dark:text-indigo-400 mb-2 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-300">
                Oops! No articles found.
              </span>
              <span className="block text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300">
                Please check back later or add a new article!
              </span>
            </p>
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
