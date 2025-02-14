import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Markdown from "react-markdown";

const SavedArticles = () => {
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("SavedArray")) || [];
    setFilteredArticles(saved);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mt-20"></div>
      <h2 className="text-3xl font-bold text-center text-indigo-800 dark:text-indigo-200 mb-10">
        Your Saved Articles
      </h2>

      {filteredArticles.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No saved articles yet. Start saving some!
        </p>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredArticles.map((article) => (
              <motion.div
                key={article._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                onClick={() => (window.location.href = `/article/${article.name}`)}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl cursor-pointer"
              >
                {/* Article Thumbnail */}
                {article.thumbnail && (
                  <div className="relative">
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <span className="absolute top-2 right-2 bg-indigo-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
                      {article.tag || "Uncategorized"}
                    </span>
                  </div>
                )}

                {/* Article Content */}
                <div className="p-6 flex flex-col justify-between h-full">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    {article.title}
                  </h3>

                  <Markdown className="text-gray-600 dark:text-gray-300 h-20 mb-4 line-clamp-3">
                    {article.content
                      ? `${article.content.substring(0, 200)}${
                          article.content.length > 200 ? "..." : ""
                        }`
                      : "No description available."}
                  </Markdown>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default SavedArticles;
