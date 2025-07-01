import React from 'react';
import { FiCode, FiHeart, FiTrendingUp, FiPenTool } from 'react-icons/fi';

const categories = [
  {
    name: 'Technology',
    description: 'Explore the latest in software engineering, AI, and more.',
    icon: <FiCode className="h-12 w-12 text-indigo-500" />,
  },
  {
    name: 'Lifestyle',
    description: 'Find tips on wellness, travel, and personal growth.',
    icon: <FiHeart className="h-12 w-12 text-pink-500" />,
  },
  {
    name: 'Business',
    description: 'Get insights on entrepreneurship, marketing, and finance.',
    icon: <FiTrendingUp className="h-12 w-12 text-green-500" />,
  },
  {
    name: 'Design',
    description: 'Discover trends in UI/UX, graphics, and visual storytelling.',
    icon: <FiPenTool className="h-12 w-12 text-purple-500" />,
  },
];

const Categories = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Discover Amazing Content
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Explore topics that matter to you
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            From technology to lifestyle, find articles that spark your curiosity and expand your knowledge.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {categories.map((category) => (
              <div key={category.name} className="flex flex-col p-8 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  {category.icon}
                  {category.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{category.description}</p>
                  <p className="mt-6">
                    <a href="#" className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                      Read More <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Categories;
