import React from 'react';

const Sidebar = () => {
  const trendingTopics = ['Technology', 'Business', 'Design', 'Culture', 'Health'];
  const categories = ['Web Development', 'React', 'JavaScript', 'CSS', 'Node.js'];
  const featuredWriters = [
    { name: 'John Doe', avatar: 'https://via.placeholder.com/40' },
    { name: 'Jane Smith', avatar: 'https://via.placeholder.com/40' },
    { name: 'Sam Wilson', avatar: 'https://via.placeholder.com/40' },
  ];

  return (
    <div className="col-span-1">
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-bold mb-4">Trending Topics</h3>
        <div className="flex flex-wrap gap-2">
          {trendingTopics.map((topic) => (
            <span key={topic} className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 mb-2 px-2.5 py-0.5 rounded-full">
              {topic}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-bold mb-4">Categories</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category} className="text-gray-700 hover:text-blue-500 cursor-pointer">
              {category}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-bold mb-4">Featured Writers</h3>
        <ul className="space-y-4">
          {featuredWriters.map((writer) => (
            <li key={writer.name} className="flex items-center">
              <img src={writer.avatar} alt={writer.name} className="w-10 h-10 rounded-full mr-4" />
              <span className="font-semibold">{writer.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-4">Popular This Week</h3>
        <ul className="space-y-4">
          <li className="font-semibold text-gray-800">How to build a blog with React</li>
          <li className="font-semibold text-gray-800">The best UI/UX design tools</li>
          <li className="font-semibold text-gray-800">Getting started with Node.js</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
