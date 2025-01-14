import React, { useEffect, useState } from 'react';
import { getContributors } from '../components/contributors/contribution.js';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

const Contributors = () => {
  const [data, setData] = useState([]);
  const [showConfetti, setShowConfetti] = useState(true);
  const { width, height } = useWindowSize();

  const getData = async () => {
    const res = await getContributors({});
    if (res) {
      setData(res);
    }
  };

  useEffect(() => {
    getData();
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 relative pt-14">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={200}
          colors={['#3b82f6', '#1d4ed8', '#FFB800', '#2563eb']}
        />
      )}
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-6 text-blue-700 dark:text-blue-400">
            Contributors
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Meet the brilliant minds who brought this project to life!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data.map((item) => (
            <a
              key={item.id}
              href={item.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 p-6 border-2 border-gray-200 dark:border-gray-700 rounded-lg 
                            transform transition-all duration-200 hover:scale-105 hover:border-blue-500 dark:hover:border-yellow-300">
                <div className="relative flex flex-col items-center">
                  <img
                    src={item.avatar_url}
                    className="w-24 h-24 rounded-full border-4 border-gray-200 dark:border-gray-700 
                             group-hover:border-blue-500 dark:group-hover:border-yellow-300 transition-colors duration-200"
                    alt={`${item.login}'s avatar`}
                  />
                  <span className="absolute -top-2 -right-2 bg-blue-600 dark:bg-yellow-500 text-white 
                                 dark:text-gray-900 text-sm font-bold px-3 py-1 rounded-full min-w-[2rem]">
                    {item.contributions}
                  </span>
                  <span className="mt-4 text-lg font-medium text-gray-800 dark:text-gray-200 
                                group-hover:text-blue-600 dark:group-hover:text-yellow-300 transition-colors duration-200">
                    {item.login}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contributors;