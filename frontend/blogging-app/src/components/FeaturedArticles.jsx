import React from 'react';
import { FiThumbsUp, FiMessageSquare } from 'react-icons/fi';

const articles = [
  {
    title: 'Building Modern Web Applications with React',
    author: 'Sarah Mitchell',
    date: '5 min read',
    description: 'A deep dive into the best practices for building scalable and maintainable web applications using React and its ecosystem.',
    imageUrl: 'https://via.placeholder.com/400x250',
    likes: 12,
    comments: 4,
    tags: ['React', 'Web Dev'],
  },
  {
    title: 'The Future of AI in Software Development',
    author: 'Michael Johnson',
    date: '7 min read',
    description: 'Exploring how artificial intelligence is transforming the software development lifecycle, from coding to testing.',
    imageUrl: 'https://via.placeholder.com/400x250',
    likes: 25,
    comments: 8,
    tags: ['AI', 'Development'],
  },
  {
    title: 'Design Systems: A Complete Guide for 2024',
    author: 'Lisa Kumar',
    date: '10 min read',
    description: 'Everything you need to know about creating and maintaining a design system that scales with your team and product.',
    imageUrl: 'https://via.placeholder.com/400x250',
    likes: 18,
    comments: 6,
    tags: ['Design', 'UI/UX'],
  },
];

const FeaturedArticles = () => {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Featured Articles
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Hand-picked stories from our community
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {articles.map((article) => (
            <article key={article.title} className="flex flex-col items-start justify-between bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-full">
                <img src={article.imageUrl} alt="" className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]" />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time dateTime={article.date} className="text-gray-500">
                    {article.date}
                  </time>
                  {article.tags.map(tag => (
                     <a
                        key={tag}
                        href="#"
                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                      >
                        {tag}
                      </a>
                  ))}
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href="#">
                      <span className="absolute inset-0" />
                      {article.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{article.description}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img src="https://via.placeholder.com/40" alt="" className="h-10 w-10 rounded-full bg-gray-100" />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a href="#">
                        <span className="absolute inset-0" />
                        {article.author}
                      </a>
                    </p>
                  </div>
                  <div className="flex items-center gap-x-4 ml-auto">
                    <span className="flex items-center text-sm text-gray-500">
                        <FiThumbsUp className="h-4 w-4 mr-1" />
                        {article.likes}
                    </span>
                    <span className="flex items-center text-sm text-gray-500">
                        <FiMessageSquare className="h-4 w-4 mr-1" />
                        {article.comments}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-16 text-center">
            <a href="#" className="text-indigo-600 hover:text-indigo-500 font-semibold">
                View All Articles
            </a>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticles;
