import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { link } from '../components/Baselink';
import { GettingArticle } from '../Utils/loader';
import { useSelector } from 'react-redux';

const PublicProfile = () => {
    const { userId } = useParams();
    const { user: currentUser } = useSelector((state) => state.auth);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followLoading, setFollowLoading] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`${link}/api/auth/user/${userId}`);
                setUser(response.data);
                console.log("response.data",response.data)
                const tempId = localStorage.getItem("userId")
                console.log("tempId",tempId)
                if (tempId && response.data.followers) {
                    console.log(response.data.followers.includes(tempId))
                    setIsFollowing(!response.data.followers.includes(tempId));
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch user profile');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [userId, currentUser]);

    const handleFollow = async () => {
        if (!currentUser) return;

        setFollowLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            };

            const endpoint = isFollowing ? 'unfollow' : 'follow';
            const method = isFollowing ? 'delete' : 'post';
            
            const response = await axios[method](
                `${link}/api/auth/${endpoint}/${userId}`,
                {},
                config
            );

            setIsFollowing(!isFollowing);
            setUser(prev => ({
                ...prev,
                followers: response.data.followers
            }));
        } catch (error) {
            console.error(`Error ${isFollowing ? 'unfollowing' : 'following'} user:`, error);
            setError(error.response?.data?.message || `Failed to ${isFollowing ? 'unfollow' : 'follow'} user`);
        } finally {
            setFollowLoading(false);
        }
    };

    if (loading) return <GettingArticle />;
    if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;
    if (!user) return <div className="text-center mt-4">User not found</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-16 pb-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mt-8">
                    {/* Profile Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-6">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 dark:from-yellow-400 dark:to-orange-500 p-1">
                                <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                                    <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-yellow-400 dark:to-orange-500 text-transparent bg-clip-text">
                                        {user.username?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-yellow-400 dark:to-orange-500 text-transparent bg-clip-text">
                                    {user.username}
                                </h1>
                                {user.name && (
                                    <p className="text-gray-600 dark:text-gray-400 mt-1">{user.name}</p>
                                )}
                            </div>
                        </div>
                        
                        {/* Follow Button - Only show if viewing another user's profile */}
                        {currentUser && currentUser.userId !== userId && (
                            <button
                                onClick={handleFollow}
                                disabled={followLoading || isFollowing}
                                className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                                    followLoading
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : isFollowing
                                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                            >
                                {followLoading ? (
                                    <span className="flex items-center space-x-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                        </svg>
                                        <span>Processing...</span>
                                    </span>
                                ) : isFollowing ? (
                                    'Following'
                                ) : (
                                    'Follow'
                                )}
                            </button>
                        )}
                    </div>

                    {/* Profile Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Location</h2>
                                <p className="text-gray-600 dark:text-gray-400">{user.location || 'Not specified'}</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Member Since</h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {new Date(user.accountCreated).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Articles Published</h2>
                                <p className="text-gray-600 dark:text-gray-400">{user.articlesPublished}</p>
                            </div>
                            {user.age && (
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Age</h2>
                                    <p className="text-gray-600 dark:text-gray-400">{user.age} years</p>
                                </div>
                            )}
                        </div>
                        <div className="space-y-4">
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Followers</h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {user.followers?.length || 0}
                                </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Following</h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {user.following?.length || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicProfile; 