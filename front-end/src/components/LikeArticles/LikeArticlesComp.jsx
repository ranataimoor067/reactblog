import { useState } from "react";
import { motion } from "framer-motion";
import ArticleDetailsModal from "../ArticledetailsModal.jsx";

const LikedArticles = ({ likedArticles }) => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  if (!likedArticles) return <p className="text-center text-gray-500">Loading...</p>;
  if (likedArticles.length === 0) return <p className="text-center text-gray-500">No liked articles found.</p>;

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-4 text-purple-600 underline">Liked Articles</h2>
      <div className="w-full overflow-x-auto">
        <ul className="flex space-x-4 p-2 w-full min-w-max">
          {likedArticles.map((article) => (
            <motion.li
              key={article.id}
              className="w-80 p-4 border hover:border hover:border-blue-600 rounded-lg shadow-md bg-white flex-none cursor-pointer"
              onClick={() => setSelectedArticle(article)}
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.15)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={article.thumbnail}
                alt={article.title}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <p className="text-lg font-medium text-blue-600 hover:underline">
                {article.title}
              </p>
              <p className="text-sm text-gray-500 overflow-hidden max-h-24">{article.content}</p>
            </motion.li>
          ))}
        </ul>
      </div>
      {selectedArticle && (
        <ArticleDetailsModal
          isOpen={Boolean(selectedArticle)}
          onClose={() => setSelectedArticle(null)}
          title={selectedArticle.title}
          content={selectedArticle.content}
          image={selectedArticle.thumbnail}
        />
      )}
    </div>
  );
};

export default LikedArticles;
