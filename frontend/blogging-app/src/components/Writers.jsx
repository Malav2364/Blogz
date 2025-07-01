import React from 'react';

const writers = [
  {
    name: 'Sarah Mitchell',
    title: 'Software Developer',
    bio: 'Passionate about creating beautiful and functional web applications. Loves to write about React, Node.js, and everything in between.',
    articles: 42,
    followers: '1.2k',
    avatar: 'SM',
  },
  {
    name: 'Michael Johnson',
    title: 'AI Researcher',
    bio: 'Exploring the frontiers of artificial intelligence and its impact on technology and society. Specializes in machine learning and NLP.',
    articles: 28,
    followers: '3.5k',
    avatar: 'MJ',
  },
  {
    name: 'Lisa Kumar',
    title: 'UX Designer',
    bio: 'Crafting intuitive and user-centered design experiences. Believes that great design is about solving problems and delighting users.',
    articles: 15,
    followers: '890',
    avatar: 'LK',
  },
    {
    name: 'David Wilson',
    title: 'Cybersecurity Analyst',
    bio: 'Protecting digital assets and educating others on best security practices. Focused on ethical hacking and threat intelligence.',
    articles: 21,
    followers: '2.1k',
    avatar: 'DW',
  },
];

const Writers = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet Our Writers</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Trusted individuals with a passion to share their expertise with the world.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {writers.map((writer) => (
            <div key={writer.name} className="flex flex-col items-center text-center bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="h-24 w-24 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-4xl mb-4">
                  {writer.avatar}
                </div>
              <h3 className="text-lg font-semibold leading-6 text-gray-900">{writer.name}</h3>
              <p className="text-indigo-600">{writer.title}</p>
              <p className="mt-4 text-sm leading-6 text-gray-600">{writer.bio}</p>
              <div className="mt-6 flex justify-center gap-x-6">
                <div>
                    <p className="font-semibold text-gray-900">{writer.articles}</p>
                    <p className="text-sm text-gray-500">Articles</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-900">{writer.followers}</p>
                    <p className="text-sm text-gray-500">Followers</p>
                </div>
              </div>
                <a href="#" className="mt-6 text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    View Profile
                </a>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
            <a href="#" className="text-indigo-600 hover:text-indigo-500 font-semibold">
                View All Writers
            </a>
        </div>
      </div>
    </div>
  );
};

export default Writers;
