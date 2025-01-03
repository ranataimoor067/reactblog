import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const url = "react-blog-server-gamma.vercel.app/";

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(url + 'api/auth/getProfile', {
      headers: {
        Authorization: token,
      },
    })
      .then(response => {
        setUser(response.data.user);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="profile-container bg-gray-100 min-h-screen p-8">
      <div className="profile-header text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Profile</h1>
        <p className="text-lg text-gray-600">View and update your personal information</p>
      </div>

      <div className="profile-card max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
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
            onClick={() => alert('Edit Profile functionality to be added')}
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
