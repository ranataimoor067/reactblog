import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProfilePage = () => {
    const navigate = useNavigate();
    const url = "https://react-blog-server-gamma.vercel.app/";

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        name: '',
        location: '',
        picture: '',
        dob: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const theme = localStorage.getItem('theme') || 'light';

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(url + 'api/auth/getProfile', {
                    headers: { Authorization: token }
                });

                const userData = response.data.user;
                setFormData(prevData => ({
                    ...prevData,
                    username: userData.username || '',
                    email: userData.email || '',
                    name: userData.name || '',
                    location: userData.location || '',
                    picture: userData.picture || '',
                    dob: userData.dob ? userData.dob.split('T')[0] : ''
                }));
            } catch (error) {
                setError('Failed to load profile data');
                console.error(error);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        // Clear any previous error/success messages
        setError('');
        setSuccess('');
    };

    const validateForm = () => {
        if (!formData.email.includes('@')) {
            setError('Please enter a valid email address');
            return false;
        }

        if (formData.newPassword && formData.newPassword.length < 8) {
            setError('New password must be at least 8 characters long');
            return false;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setError('New passwords do not match');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const updateData = {
                username: formData.username,
                email: formData.email,
                name: formData.name,
                location: formData.location,
                picture: formData.picture,
                dob: formData.dob
            };

            // Only include password fields if user is trying to change password
            if (formData.currentPassword && formData.newPassword) {
                updateData.currentPassword = formData.currentPassword;
                updateData.newPassword = formData.newPassword;
            }

            await axios.put(url + 'api/auth/editProfile', updateData, {
                headers: { Authorization: token }
            }).then(() => {
                setSuccess('Profile updated successfully!');
            }).then(() =>
                navigate('/profile'));
        } catch (error) {
            if (error.response?.status === 401) {
                setError('Current password is incorrect');
            } else if (error.response?.status === 409) {
                setError('Email or username already in use');
            } else {
                setError('Failed to update profile. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`max-w-2xl mx-auto p-6 pt-20 ${theme === 'dark' ? 'text-slate-100' : 'text-gray-900'}`}>
            <div className={`shadow-xl rounded-lg p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold">Edit Profile</h1>
                    <p className="text-sm mt-2">Update your personal information</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Profile Picture Preview */}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <img
                                src={formData.picture || 'https://via.placeholder.com/150'}
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover border-4 border-green-500 z-1"
                            />
                        </div>
                    </div>

                    {/* Basic Information */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium mb-1">Username</label>
                            <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                {formData.username}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                {formData.email}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full p-3 rounded-lg border ${formData.name ? 'border-green-500' : 'border-gray-300'
                                    } focus:ring-2 focus:ring-green-500 focus:outline-none ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'
                                    }`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className={`w-full p-3 rounded-lg border ${formData.location ? 'border-green-500' : 'border-gray-300'
                                    } focus:ring-2 focus:ring-green-500 focus:outline-none ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'
                                    }`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Profile Picture URL</label>
                            <input
                                type="text"
                                name="picture"
                                value={formData.picture}
                                onChange={handleChange}
                                className={`w-full p-3 rounded-lg border ${formData.picture ? 'border-green-500' : 'border-gray-300'
                                    } focus:ring-2 focus:ring-green-500 focus:outline-none ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'
                                    }`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                className={`w-full p-3 rounded-lg border ${formData.dob ? 'border-green-500' : 'border-gray-300'
                                    } focus:ring-2 focus:ring-green-500 focus:outline-none ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'
                                    }`}
                            />
                        </div>
                    </div>

                    {/* Password Change Section */}
                    <div className={`border-t pt-6 mt-6 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                        <h3 className="text-lg font-medium mb-4">Change Password</h3>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium mb-1">Current Password</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                    className={`w-full p-3 rounded-lg border ${formData.currentPassword ? 'border-green-500' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-green-500 focus:outline-none ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'
                                        }`}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    className={`w-full p-3 rounded-lg border ${formData.newPassword ? 'border-green-500' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-green-500 focus:outline-none ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'
                                        }`}
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`w-full p-3 rounded-lg border ${formData.confirmPassword ? 'border-green-500' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-green-500 focus:outline-none ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'
                                        }`}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Error and Success Messages */}
                    {error && (
                        <div className="bg-red-100 border-l-4 border-red-400 p-4 text-red-700">
                            <p>{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-100 border-l-4 border-green-400 p-4 text-green-700">
                            <p>{success}</p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate('/profile')}
                            className={`px-6 py-2 rounded-lg ${theme === 'dark'
                                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-2 rounded-lg transition-transform transform hover:scale-105 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProfilePage;