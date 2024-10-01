import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8080/api/profile', {
      headers: {
        Authorization: token,
      },
    })
     .then(response => {
        setUser(response.data);
      })
     .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Username: {user.username}</p>
    </div>
  );
};

export default ProfilePage;
