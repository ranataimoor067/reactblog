import { useState } from 'react';

const SearchPage = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md mt-10 flex items-center">
        {/* Image placed on the left */}
        <img 
          src="https://img.freepik.com/free-vector/bug-fixing-software-testing-computer-virus-searching-tool-develops-web-optimization-antivirus-app-magnifier-cogwheel-monitor-design-element-concept-illustration_335657-1747.jpg?t=st=1736704009~exp=1736707609~hmac=8a0d2bdc96605e3cdb762c7f96d6a59ff48668ba7434d29f86469240631755aa&w=740"  // Replace with your desired image URL
          alt="search icon"
          className="mr-4 w-24 h-24"  // Adjust size as needed
        />
        {/* Search input field */}
        <div className="w-full">
          <label htmlFor="search" className="block text-lg font-medium text-gray-700 mb-2">
            Type your favourite
          </label>
          <input
            type="text"
            id="search"
            value={query}
            onChange={handleSearch}
            placeholder="Search blogs or articles..."
            className="w-full px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
