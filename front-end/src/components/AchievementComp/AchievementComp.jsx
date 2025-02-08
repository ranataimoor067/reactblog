import { useEffect, useState } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";

const AchievementPage = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/achievement/getachievements");
        console.log(response.data.fetchedAchievements);
        setAchievements(response.data.fetchedAchievements);
      } catch (err) {
        setError("Failed to load achievements");
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    // <div className="max-w-4xl mt-20 p-6 transition-opacity duration-500 ease-in opacity-100">
    <>
    <div className="mb-28">.</div>
    <h2 className="text-2xl font-semibold text-center mb-6">Achievements</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {achievements.map((achievement) => (
        <motion.div
          key={achievement._id}
          className="bg-white p-4 shadow-lg rounded-lg flex justify-center items-center cursor-pointer"
          whileHover={{ y: -10 }}
          onClick={() => setSelectedAchievement(achievement)}
        >
          <img 
            src={achievement.logo} 
            alt={achievement.name} 
            className="w-16 h-16 transition-transform duration-500 ease-in-out"
          />
        </motion.div>
      ))}
    </div>

    {selectedAchievement && (
      <Dialog open={true} onClose={() => setSelectedAchievement(null)} className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full flex flex-col items-center">
          <motion.img 
            src={selectedAchievement.logo} 
            alt={selectedAchievement.name} 
            className="w-24 h-24 mb-4" 
            animate={{ rotate: 360 }} 
            transition={{ duration: 1, repeat: 1 }}
          />
          <Dialog.Title className="text-xl font-bold">{selectedAchievement.name}</Dialog.Title>
          <p className="text-gray-500 mt-2">Achieved on: {new Date(selectedAchievement.achevedOn).toLocaleDateString()}</p>
          <p className="mt-4 text-center">{selectedAchievement.description}</p>
          <button 
            onClick={() => setSelectedAchievement(null)} 
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </Dialog>
    )}
    
    </>
    // </div>
  );
};

export default AchievementPage;