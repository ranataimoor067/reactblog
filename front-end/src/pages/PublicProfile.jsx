import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { link } from '../components/Baselink';
import { GettingArticle } from '../Utils/loader';
import { useSelector } from 'react-redux';
import { FaUserPlus, FaUserMinus } from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";

const PublicProfile = () => {
    const { userId } = useParams();
    const { user: currentUser } = useSelector((state) => state.auth);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followLoading, setFollowLoading] = useState(false);
    const [followError, setFollowError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setError(null);
                const response = await axios.get(`${link}/api/auth/user/${userId}`);
                setUser(response.data);
                console.log("response.data",response.data)
                const tempId = localStorage.getItem("userId")
                console.log("tempId",tempId)
                if (tempId && response.data.followers) {
                    console.log(response.data.followers.includes(tempId))
                    setIsFollowing(response.data.followers.includes(tempId));
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
        if (!currentUser) {
            setFollowError('Please login to follow users');
            return;
        }

        setFollowLoading(true);
        setFollowError(null);

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            };

            const endpoint = isFollowing ? 'unfollow' : 'follow';
            const response = await axios.post(
                `${link}/api/auth/${endpoint}/${userId}`,
                {},
                config
            );

            // Update local state
            setIsFollowing(!isFollowing);
            setUser(prev => ({
                ...prev,
                followers: response.data.followers
            }));
            
            // Clear any existing errors
            setFollowError(null);
        } catch (error) {
            console.error(`Error ${isFollowing ? 'unfollowing' : 'following'} user:`, error);
            setFollowError(error.response?.data?.error || `Failed to ${isFollowing ? 'unfollow' : 'follow'} user`);
            // Don't update isFollowing state if there's an error
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
                {/* Show follow error if exists */}
                {followError && (
                    <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {followError}
                    </div>
                )}
                
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
                                disabled={followLoading}
                                className={`
                                    flex items-center justify-center gap-2
                                    px-4 sm:px-6 py-2 
                                    rounded-full font-semibold
                                    transition-all duration-300 ease-in-out
                                    transform hover:scale-105
                                    text-sm sm:text-base
                                    min-w-[120px] sm:min-w-[140px]
                                    ${followLoading
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : isFollowing
                                            ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-red-500 hover:text-white dark:hover:bg-red-600'
                                            : 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                                    }
                                    focus:outline-none focus:ring-2 
                                    ${isFollowing 
                                        ? 'focus:ring-red-500' 
                                        : 'focus:ring-blue-500'
                                    }
                                    focus:ring-offset-2 dark:focus:ring-offset-gray-800
                                    shadow-md hover:shadow-lg
                                `}
                            >
                                {followLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <BiLoaderAlt className="animate-spin h-5 w-5" />
                                        <span className="hidden sm:inline">Processing...</span>
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        {isFollowing ? (
                                            <>
                                                <FaUserMinus className={`h-4 w-4 transition-colors duration-300 
                                                    ${followLoading ? 'text-gray-400' : 'group-hover:text-white'}`} 
                                                />
                                                <span>Unfollow</span>
                                            </>
                                        ) : (
                                            <>
                                                <FaUserPlus className="h-4 w-4" />
                                                <span>Follow</span>
                                            </>
                                        )}
                                    </span>
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