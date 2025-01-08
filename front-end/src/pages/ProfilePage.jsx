import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { link } from '../components/Baselink';

const ProfilePage = () => {
  const [user, setUser] = useState({}); 
  const [userArticles, setUserArticles] = useState([])
// const url = "https://react-blog-server-gamma.vercel.app/"
const url = `${link}`
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(url + '/api/auth/getProfile', {
      headers: {
        Authorization: token,
      },
    })
      .then(response => {
        console.log(response.data.user._id)
        setUser(response.data.user);
        
        axios.post(`${url}/api/article/getarticlesbyuser`,{uid:response.data.user._id})
        .then((response)=>{
          console.log(response)
        })
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

      <div className="profile-card max-w-lg mx-auto p-6 rounded-lg shadow-lg">
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
            <p><strong>Articles Published:</strong> {user.articlesPublished}</p>
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
    </div>
  );
};

export default ProfilePage;
