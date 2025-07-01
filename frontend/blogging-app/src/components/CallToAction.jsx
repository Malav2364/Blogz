import React from 'react';
import { FiCheckCircle, FiFeather } from 'react-icons/fi';

const CallToAction = () => {
  return (
    <div className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
            <FiFeather className="mx-auto h-12 w-12 text-white"/>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to Share Your Voice?
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-300">
            Join our community of writers and start building your audience today. It's free, easy, and takes less than a minute to get started.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50"
              >
                Create Your First Post
              </a>
            </div>
            <div className="ml-3 inline-flex">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-700 hover:bg-gray-600"
              >
                Learn More
              </a>
            </div>
          </div>
            <div className="mt-10 flex justify-center gap-x-8 text-gray-300">
                <div className="flex items-center gap-x-2">
                    <FiCheckCircle/>
                    <span>Free to start</span>
                </div>
                <div className="flex items-center gap-x-2">
                    <FiCheckCircle/>
                    <span>Build an audience</span>
                </div>
                <div className="flex items-center gap-x-2">
                    <FiCheckCircle/>
                    <span>Professional tools</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
