import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { link } from '../components/Baselink';
import { useDispatch } from 'react-redux';
import { logout as authLogout } from "../store/authSlice";
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [userArticles, setUserArticles] = useState([]);
  const url = `${link}`;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();

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

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${url}/api/auth/deleteAccount/generate-otp`, {
        email: user.email
      });
      setIsOtpSent(true);
      toast.info('OTP has been sent to your email');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    }
  };

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      const token = localStorage.getItem('token');
      await axios.delete(`${url}/api/auth/deleteAccount`, {
        headers: { Authorization: token },
        data: { otp }
      });

      // Clear local storage and redux state
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      dispatch(authLogout());

      toast.success('Your account has been successfully deleted');
      setIsDeleting(false);
      setShowDeleteModal(false);
      setIsOtpSent(false);
      setOtp('');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to delete account');
    }
  };

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

        <div className="flex justify-between mt-8">
          <button
            onClick={() => navigate('/edit-profile')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
          >
            Edit Profile
          </button>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
          >
            Delete Account
          </button>
        </div>

        {/* Delete Account Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Delete Account</h2>

              {!isOtpSent ? (
                <>
                  <p className="text-gray-700 mb-6">
                    Are you sure you want to delete your account? This action cannot be undone.
                    All your data, including articles and comments, will be permanently deleted.
                  </p>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteAccount}
                      className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                    >
                      Proceed
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-700 mb-4">
                    Please enter the OTP sent to your email to confirm account deletion.
                  </p>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full p-3 mb-4 border rounded-lg"
                  />
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => {
                        setShowDeleteModal(false);
                        setIsOtpSent(false);
                        setOtp('');
                      }}
                      className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                      disabled={isDeleting}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                      disabled={isDeleting}
                    >
                      {isDeleting ? 'Deleting...' : 'Confirm Delete'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
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
