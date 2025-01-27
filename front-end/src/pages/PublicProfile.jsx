import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { link } from '../components/Baselink';
import { GettingArticle } from '../Utils/loader';

const PublicProfile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`${link}/api/auth/user/${userId}`);
                setUser(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch user profile');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [userId]);

    if (loading) return <GettingArticle />;
    if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;
    if (!user) return <div className="text-center mt-4">User not found</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-16 pb-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mt-8">
                    {/* Profile Header */}
                    <div className="flex items-center space-x-6 mb-8">
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicProfile; 