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
    <div className="profile-container min-h-screen p-8 pt-20 bg-gradient-to-b from-blue-100 via-white to-blue-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800" style={{ color: 'var(--text-color)' }}>
      <div className="profile-header text-center mb-8 mt-5">
        <h1 className="text-5xl font-extrabold text-indigo-800 dark:text-indigo-400 drop-shadow-lg">Profile</h1>
      </div>

      <div className="profile-card max-w-lg mx-auto p-8 rounded-2xl shadow-2xl mb-12 bg-white dark:bg-gray-800 border-4 border-indigo-300 dark:border-indigo-600 transform hover:scale-105 transition-all duration-300">
        <div className="profile-header flex justify-center mb-6">
          {user.picture ? (
              <img
                src={user.picture}
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-indigo-500 dark:border-indigo-400 transform transition-transform duration-300 hover:scale-110 shadow-lg"
              />
            ) : (
              <div className="w-40 h-40 rounded-full bg-indigo-200 dark:bg-indigo-600 flex items-center justify-center border-4 border-indigo-500 dark:border-indigo-400 shadow-lg">
                <span className="text-indigo-700 dark:text-indigo-100 text-2xl font-semibold">
                  {user.name
                    ? user.name
                        .split(' ')
                        .map((word) => word[0])
                        .join('')
                    : 'N/A'}
                </span>
              </div>
            )}
        </div>

        <div className="profile-details space-y-6">
          <div className="profile-info">
            <p className="text-2xl font-bold text-indigo-800 dark:text-indigo-300 text-center">{user.name}</p>

            <div className="flex flex-col gap-3 mt-5 border border-indigo-700 dark:border-indigo-500 py-4">
              {/* Header */}
              <h2 className="text-indigo-700 dark:text-indigo-300 font-semibold text-lg ml-5">Basic Information</h2>            
              {/* Content */}
              <div className="flex flex-col gap-3 ml-5 mr-5">
                {/* First Line: Username and Email */}
                <div className="flex justify-between gap-8">
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Username</span>
                    <span className="text-gray-700 dark:text-gray-200 font-medium min-w-[120px] text-left">{user.username}</span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Email</span>
                    <span className="text-gray-700 dark:text-gray-200 font-medium min-w-[190px] text-left">{user.email}</span>
                  </div>
                </div>
                <div className='border-t border-gray-300 dark:border-gray-600'></div>

                {/* Second Line: Location and DOB */}
                <div className="flex justify-between gap-8">
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Location</span>
                    <span className="text-gray-700 dark:text-gray-200 font-medium min-w-[100px] text-left">{user.location ? user.location : "-"}</span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-gray-500 dark:text-gray-400">DOB</span>
                    <span className="text-gray-700 dark:text-gray-200 font-medium min-w-[190px] text-left">
                    {user.dob ? new Date(user.dob).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    }).replace(/ /g, '-') : "-"}
                    </span>
                  </div>
                </div>
                <div className='border-t border-gray-300 dark:border-gray-600'></div>


                <div className="flex justify-between gap-8">
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Your Level</span>
                    <span className="text-gray-700 dark:text-gray-200 font-medium min-w-[100px] text-left">{user.authorLevel ? user.authorLevel.levelName : "-"}</span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Level Progress</span>
                    <span className="text-gray-700 dark:text-gray-200 font-medium min-w-[190px] text-left">
                    {user.authorLevel ? user.authorLevel.levelProgress  : "-"}
                    </span>
                  </div>
                </div>
                <div className='border-t border-gray-300 dark:border-gray-600'></div>

                {/* Third Line: Account created  */}
                <div className="flex justify-between gap-2">
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Account Created</span>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">
                    {user.accountCreated ? new Date(user.accountCreated).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    }).replace(/ /g, '-') : '-'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Article Liked and Article Commented for future purpose */}
            <div className="grid grid-cols-3 gap-4 text-center mt-6 border-t border-b border-indigo-700 dark:border-indigo-500 py-4">
              <div className='border-r border-gray-300 dark:border-gray-600'>
                <p className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-300">{userArticles.length}</p>
                <p className="text-sm text-gray-500">Articles Published</p>
              </div>
              <div className='border-r border-gray-300 dark:border-gray-600'>
                <p className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-300">{user?.likedArticles?.length || 0}</p>
                <p className="text-sm text-gray-500">Articles Liked</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-300">
                    {user?.commentedArticles?.length || 0}
                </p>
                <p className="text-sm text-gray-500">Articles Commented</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-5 justify-between mt-8">
          <button
            onClick={() => navigate('/edit-profile')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
          >
            Edit Profile
          </button>
          
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-gradient-to-r from-purple-600 to-red-600 dark:from-purple-500 dark:to-red-500 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
          >
            Dashboard
          </button>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-gradient-to-r from-red-600 to-pink-600 dark:from-red-500 dark:to-pink-500 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
          >
            Delete Account
          </button>
        </div>

        {/* Delete Account Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Delete Account</h2>

              {!isOtpSent ? (
                <>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Are you sure you want to delete your account? This action cannot be undone.
                    All your data, including articles and comments, will be permanently deleted.
                  </p>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteAccount}
                      className="px-4 py-2 rounded-lg bg-red-600 dark:bg-red-500 text-white hover:bg-red-700 dark:hover:bg-red-600"
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
        <h2 className="text-3xl font-bold text-center text-indigo-700 dark:text-indigo-400 mb-8">Your Published Articles</h2>
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
              <h3 className="font-bold text-lg text-indigo-600 dark:text-indigo-300 mb-3">{article.title}</h3>
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
