import React from 'react';

const MainContent = () => {
  const articles = [
    {
      id: 1,
      author: 'John Doe',
      date: 'May 2, 2024',
      title: 'The Future of Web Development',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'https://via.placeholder.com/800x400',
      tags: ['webdev', 'react', 'javascript'],
    },
    {
      id: 2,
      author: 'Jane Smith',
      date: 'May 1, 2024',
      title: 'A Guide to Mindful Living',
      content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      image: 'https://via.placeholder.com/800x400',
      tags: ['mindfulness', 'lifestyle', 'health'],
    },
  ];

  return (
    <div className="col-span-1 lg:col-span-2">
      <h2 className="text-2xl font-bold mb-4">Latest Articles</h2>
      <div className="space-y-8">
        {articles.map((article) => (
          <div key={article.id} className="bg-white p-6 rounded-lg shadow-md">
            <img src={article.image} alt={article.title} className="w-full h-64 object-cover rounded-t-lg mb-4" />
            <div className="flex items-center text-gray-500 text-sm mb-2">
              <span>{article.author}</span>
              <span className="mx-2">•</span>
              <span>{article.date}</span>
            </div>
            <h3 className="text-xl font-bold mb-2">{article.title}</h3>
            <p className="text-gray-700 mb-4">{article.content}</p>
            <div className="flex items-center">
              {article.tags.map((tag) => (
                <span key={tag} className="bg-gray-200 text-gray-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
