import React, { useState } from 'react';
import axios from 'axios';
import { link } from '../components/Baselink';
import { CreatingArticleLoader } from '../Utils/loader';
import MDEditor from '@uiw/react-md-editor';

const AddArticlePage = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        thumbnail: '',
        tag: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editorMode, setEditorMode] = useState('normal'); // 'normal' or 'markdown'
    const [savingDraft, setSavingDraft] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'thumbnail') {
            setFormData({ ...formData, thumbnail: e.target.files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleContentChange = (value) => {
        setFormData({ ...formData, content: value });
    };

    const url = `${link}`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const data = new FormData();
            data.append('title', formData.title);
            data.append('content', formData.content);
            data.append('thumbnail', formData.thumbnail);
            data.append('tag', formData.tag);

            await axios.post(
                `${url}/api/article/addarticle`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            // Redirect or perform an action after successful submission
            window.location.href = '/article-list';
        } catch (err) {
            setError(err.response?.data?.error || 'Error creating article');
        }
        setLoading(false);
    };

    const handleSaveDraft = async (e) => {
        e.preventDefault();
        setSavingDraft(true);
        try {
            const token = localStorage.getItem('token');
            const data = new FormData();
            
            // Only append fields that have values
            if (formData.title) data.append('title', formData.title);
            if (formData.content) data.append('content', formData.content);
            if (formData.thumbnail) data.append('thumbnail', formData.thumbnail);
            if (formData.tag) data.append('tag', formData.tag);

            await axios.post(
                `${url}/api/article/create-draft`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            // Redirect to drafts page or show success message
            window.location.href = '/drafts';
        } catch (err) {
            setError(err.response?.data?.error || 'Error saving draft');
        }
        setSavingDraft(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-purple-100 to-indigo-200 text-white flex items-center justify-center p-6">
            <div className="bg-white text-black rounded-lg shadow-xl w-full max-w-3xl p-8">
                <h2 className="text-2xl font-bold mb-6  text-center text-indigo-600">
                    <div className='border-4 border-purple-500 inline-block px-3 rounded-md'>Create a New Article</div>    
                </h2>

                {error && (
                    <div className="mb-4 p-4 bg-red-100 border border-red-300 text-red-600 rounded-md">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter article title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Content Editor Mode
                        </label>
                        <select
                            value={editorMode}
                            onChange={(e) => setEditorMode(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none"
                        >
                            <option value="normal">Normal Text</option>
                            <option value="markdown">Markdown Editor</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Content
                        </label>
                        {editorMode === 'normal' ? (
                            <textarea
                                name="content"
                                placeholder="Write your article content"
                                value={formData.content}
                                onChange={(e) => handleContentChange(e.target.value)}
                                required
                                rows="6"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none resize-none"
                            />
                        ) : (
                            <MDEditor
                                value={formData.content}
                                onChange={handleContentChange}
                                height={400}
                                className="rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none"
                            />
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Thumbnail
                        </label>
                        <input
                            type="file"
                            name="thumbnail"
                            accept="image/*"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Tag
                        </label>
                        <select
                            name="tag"
                            value={formData.tag}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none"
                        >
                            <option value="" disabled>Select Tag</option>
                            <option value="Tech">Technology</option>
                            <option value="Music">Music</option>
                            <option value="Game">Gaming</option>
                            <option value="Movies">Movies</option>
                            <option value="Books">Books</option>
                            <option value="Food">Food</option>
                            <option value="Travel">Travel</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Health">Health</option>
                            <option value="Sports">Sports</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                            <option value="Finance">Finance</option>
                            <option value="Politics">Politics</option>
                            <option value="Narratives">Narratives</option>
                            <option value="Trending-Topics">Trending-Topics</option>
                        </select>
                    </div>

                    <div className="flex justify-center space-x-4">
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
                            disabled={loading || savingDraft}
                        >
                            {loading ? (<div>Creating.....</div>) : (<div>Create</div>)}
                        </button>
                        <button
                            type="button"
                            onClick={handleSaveDraft}
                            className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
                            disabled={loading || savingDraft}
                        >
                            {savingDraft ? 'Saving...' : 'Save as Draft'}
                        </button>
                        <button
                            type="button"
                            onClick={() => (window.location.href = '/article-list')}
                            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300"
                            disabled={loading || savingDraft}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddArticlePage;
