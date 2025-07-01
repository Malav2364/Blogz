import React from 'react';
import { FaLeaf, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
                <FaLeaf className="text-2xl text-green-500 mr-2" />
                <span className="text-2xl font-bold">BlogSpace</span>
            </div>
            <p className="text-gray-400 text-base">
              Join thousands of writers sharing their knowledge, experiences, and insights. Build your audience, connect with readers, and make your voice heard.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaGithub className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Platform</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">Write</a></li>
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">Read</a></li>
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">Discover</a></li>
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">Community</a></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">Help Center</a></li>
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">Contact Us</a></li>
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">Guidelines</a></li>
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">FAQ</a></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">About</a></li>
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">Careers</a></li>
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">Press</a></li>
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">&copy; 2024 BlogSpace, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
