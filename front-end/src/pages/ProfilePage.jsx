import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { link } from '../components/Baselink';

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [userArticles, setUserArticles] = useState([]);
  const url = `${link}`;

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(url + '/api/auth/getProfile', {
        headers: {
          Authorization: token,
        },
      })
      .then(response => {
        console.log(response.data.user);
        setUser(response.data.user);

        // Fetch user articles
        axios
          .post(`${url}/api/article/getarticlesbyuser`, { uid: response.data.user._id })
          .then(response => {
            console.log(response.data.articleDetails);
            setUserArticles(response.data.articleDetails);
          });
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const navigate = useNavigate();

  return (
    <div className="profile-container min-h-screen p-8 pt-20 bg-gradient-to-b from-blue-100 via-white to-blue-200" style={{ color: 'var(--text-color)' }}>
      <div className="profile-header text-center mb-8">
        <h1 className="text-5xl font-extrabold text-indigo-800 drop-shadow-lg">Profile</h1>
        <p className="text-lg text-gray-700 mt-2 italic">View and update your personal information</p>
      </div>

      <div className="profile-card max-w-lg mx-auto p-8 rounded-2xl shadow-2xl mb-12 bg-white border-4 border-indigo-300 transform hover:scale-105 transition-all duration-300">
        <div className="profile-header flex justify-center mb-6">
          <img
            src={user.picture || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-indigo-500 transform transition-transform duration-300 hover:scale-110 shadow-lg"
          />
        </div>

        <div className="profile-details space-y-6">
          <div className="profile-info">
            <p><strong className="text-indigo-700">Username:</strong> {user.username}</p>
            <p><strong className="text-indigo-700">Email:</strong> {user.email}</p>
            <p><strong className="text-indigo-700">Full Name:</strong> {user.name}</p>
            <p><strong className="text-indigo-700">Location:</strong> {user.location}</p>
            <p><strong className="text-indigo-700">Date of Birth:</strong> {user.dob}</p>
            <p><strong className="text-indigo-700">Account Created On:</strong> {new Date(user.accountCreated).toLocaleDateString()}</p>
            <p><strong className="text-indigo-700">Articles Published:</strong> {userArticles.length}</p>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/edit-profile')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
          >
            Edit Profile
          </button>
        </div>
      </div>

      <div className="articles-section">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">Your Published Articles</h2>
        <div className="articles-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userArticles.map(article => (
            <div 
              key={article._id} 
              className="article-card p-6 rounded-xl shadow-lg bg-white transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:border-indigo-400 border-2 border-transparent">
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
              <div className="text-right">
                <button
                  onClick={() => navigate(`/article/${article.name}`)}
                  className="text-blue-500 underline transform transition-all duration-300 hover:scale-110 hover:text-indigo-600"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
