import React from 'react';

const Hero = () => {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Share Your Story With</span>
            <span className="block text-indigo-600">The World</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Join thousands of writers sharing their knowledge, experiences, and
            insights. Build your audience, connect with readers, and make your
            voice heard.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                Start Writing Today
              </a>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                Explore Articles
              </a>
            </div>
          </div>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="text-center">
            <p className="text-5xl font-bold text-indigo-600">50K+</p>
            <p className="mt-2 text-lg font-medium text-gray-500">
              Active Writers
            </p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold text-indigo-600">2M+</p>
            <p className="mt-2 text-lg font-medium text-gray-500">
              Articles Published
            </p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold text-indigo-600">10M+</p>
            <p className="mt-2 text-lg font-medium text-gray-500">
              Monthly Readers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
