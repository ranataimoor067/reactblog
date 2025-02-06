import { useEffect, useState } from "react";
import { link } from "../Baselink";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SaveForLaterArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${link}/api/article/getsavedlarticles`, { headers: { authorization: localStorage.getItem("token") } });
        console.log(response.data.fetchedArticles);
        setArticles(response.data.fetchedArticles || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const removeArticle = async (articleId) => {
    try {
      await axios.post(`${link}/api/article/removeSavedArticle`, { id: articleId }, { headers: { authorization: localStorage.getItem("token") } });
      setArticles((prevArticles) => prevArticles.filter((article) => article._id !== articleId));
    } catch (err) {
      console.error("Error removing article:", err);
    }
  };

  if (loading) return <p className="text-blue-500">Loading articles...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (articles.length === 0) return <p className="text-blue-300">No saved articles found.</p>;

  return (
    <div className="mb-4 p-6 rounded-lg shadow-md overflow-x-auto whitespace-nowrap">
      <h2 className="text-purple-600 text-xl font-bold mb-4 ">Saved Articles</h2>
      <div className="flex space-x-4">
        {articles.map((article) => (

          <div key={article._id} className="bg-blue-400 p-4 rounded-lg min-w-[300px] max-w-sm flex-shrink-0 relative group">
            <img src={article.thumbnail} alt={article.title} className="w-full h-40 object-cover rounded-md mb-2" />
            <h3 className="text-blue-200 text-lg font-semibold">{article.title}</h3>
            <p className="text-blue-100 truncate">{article.content.length > 100 ? article.content.substring(0, 100) + "..." : article.content}</p>
            <div
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => removeArticle(article._id)}
            >
              <FaTrash size={16} />
            </div>
            
            <Link to={`/article/${article.name}`}>
              <div>Read NOw...1</div>           
            </Link>

          </div>

        ))}
      </div>
    </div>
  );
};

export default SaveForLaterArticleList;