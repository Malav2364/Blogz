import React from 'react';
import { FiSearch, FiEdit } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <FaLeaf className="text-2xl text-green-500 mr-2" />
            <span className="text-2xl font-bold">BlogSpace</span>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a href="#" className="text-gray-500 hover:text-gray-900">Home</a>
            <a href="#" className="text-gray-500 hover:text-gray-900">Explore</a>
            <a href="#" className="text-gray-500 hover:text-gray-900">Categories</a>
            <a href="#" className="text-gray-500 hover:text-gray-900">About</a>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </span>
              <input
                className="block w-full bg-gray-100 border border-transparent rounded-full py-2 pl-10 pr-4 text-sm placeholder-gray-500 focus:outline-none focus:bg-white focus:border-gray-300"
                placeholder="Search articles..."
                type="search"
              />
            </div>
            <button className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900">
              <FiEdit className="h-5 w-5 mr-2" />
              Write
            </button>
            <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold">
                  JU
                </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
