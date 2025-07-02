import React from 'react';
import { Twitter, Github, Dribbble } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">BlogSpace</h3>
            <p className="text-sm">Empowering writers to share their stories and connect with a global audience.</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-white"><Twitter /></a>
              <a href="#" className="hover:text-white"><Github /></a>
              <a href="#" className="hover:text-white"><Dribbble /></a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Write</a></li>
              <li><a href="#" className="hover:text-white">Read</a></li>
              <li><a href="#" className="hover:text-white">Discover</a></li>
              <li><a href="#" className="hover:text-white">Community</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Guidelines</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Privacy</a></li>
              <li><a href="#" className="hover:text-white">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2024 BlogSpace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
