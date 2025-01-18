import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);





function Dashboard() {
  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/")
    }
  
  }, [])
  // Dummy data for the graph
  const graphData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Articles Published",
        data: [5, 10, 8, 15, 7, 12],
        backgroundColor: "rgba(59, 130, 246, 0.6)", // Blue
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
      {
        label: "Articles Liked",
        data: [3, 12, 6, 10, 9, 14],
        backgroundColor: "rgba(168, 85, 247, 0.6)", // Purple
        borderColor: "rgba(168, 85, 247, 1)",
        borderWidth: 1,
      },
    ],
  };

  const graphOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Articles vs Likes (Monthly)",
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="h-full bg-gradient-to-b from-indigo-100 via-purple-100 to-indigo-200 text-white px-4 sm:px-8 py-4"
    >
      {/* Dashboard Heading */}
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-4xl mt-20 font-bold text-center mb-8 text-indigo-800  drop-shadow-lg "
      >
        Dashboard
      </motion.h1>

      {/* Grid layout for the dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-6">
        {/* Name Section with Image */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-blue-600 shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center justify-center md:justify-between transition duration-300 ease-in-out hover:shadow-2xl"
        >
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-4">Welcome, [User Name]</h2>
            <p className="text-lg">Your personalized dashboard overview.</p>
          </div>
          <motion.img
            src="https://via.placeholder.com/100"
            alt="User Avatar"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{scale:1.4}}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 rounded-full border-4 border-blue-500 mt-4 md:mt-0"
          />
        </motion.div>

        {/* Published Articles */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-purple-600 shadow-lg rounded-lg p-6 transition duration-300 ease-in-out hover:shadow-2xl"
        >
          <h2 className="text-2xl font-semibold mb-4">Published Articles</h2>
          <p className="text-lg">You have published 10 articles.</p>
        </motion.div>

        {/* Liked Articles */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-blue-600 shadow-lg rounded-lg p-6 transition duration-300 ease-in-out hover:shadow-2xl"
        >
          <h2 className="text-2xl font-semibold mb-4">Liked Articles</h2>
          <p className="text-lg">You have liked 25 articles.</p>
        </motion.div>

        {/* Articles vs Likes Graph */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white text-purple-600 shadow-lg rounded-lg p-6"
        >
          <h2 className="text-2xl font-semibold mb-4">Articles vs Likes</h2>
          <div className="w-full">
            <Bar data={graphData} options={graphOptions} />
          </div>
        </motion.div>
      </div>

      {/* Articles and Liked By Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white text-blue-600 shadow-lg rounded-lg p-6 mt-10 transition duration-300 ease-in-out hover:shadow-2xl mb-12"
      >
        <h2 className="text-2xl font-semibold mb-4">Articles & Liked By</h2>
        <p className="text-lg">
          Example: Article 1 - Liked by [User A], [User B], and [User C].
        </p>
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;
