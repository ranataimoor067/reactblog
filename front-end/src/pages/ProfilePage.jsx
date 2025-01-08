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
    <div className="profile-container min-h-screen p-8 pt-20" style={{ color: 'var(--text-color)' }}>
      <div className="profile-header text-center mb-8">
        <h1 className="text-4xl font-bold">Profile</h1>
        <p className="text-lg">View and update your personal information</p>
      </div>

      <div className="profile-card max-w-lg mx-auto p-6 rounded-lg shadow-lg mb-10">
        <div className="profile-header flex justify-center mb-4">
          <img
            src={user.picture || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>

        <div className="profile-details space-y-4">
          <div className="profile-info">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Full Name:</strong> {user.name}</p>
            <p><strong>Location:</strong> {user.location}</p>
            <p><strong>Date of Birth:</strong> {user.dob}</p>
            <p><strong>Account Created On:</strong> {new Date(user.accountCreated).toLocaleDateString()}</p>
            <p><strong>Articles Published:</strong> {userArticles.length}</p>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/edit-profile')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </div>
      </div>

      <div className="articles-section">
  <h2 className="text-2xl font-bold text-center mb-6">Your Published Articles: {user.articlesPublished}</h2>
  <div className="articles-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {userArticles.map(article => (
      <div 
        key={article._id} 
        className="article-card p-4 rounded-lg shadow-md bg-white transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
      >
        {/* Thumbnail */}
        {article.thumbnail && (
          <img 
            src={article.thumbnail} 
            alt={`${article.title} Thumbnail`} 
            className="w-full h-40 object-cover rounded-t-lg mb-4"
          />
        )}
        
        {/* Article Content */}
        <h3 className="font-bold text-lg mb-2">{article.title}</h3>
        <p className="text-sm text-gray-600 mb-4 ">
  {article.content ? 
    (article.content.length > 100 ? `${article.content.substring(0, 100)}...` : article.content) 
    : 'No description available.'}
</p>
        <div className="text-right">
          <button
            onClick={() => navigate(`/article/${article.name}`)}
            className="text-blue-500 underline"
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
