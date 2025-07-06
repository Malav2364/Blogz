import React from 'react';
import { Twitter, Github, Dribbble } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">BlogSpace</h3>
            <p className="text-sm pr-8">Empowering writers to share their stories and connect with a global audience.</p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="hover:text-cyan-500 transition-colors"><Twitter /></a>
              <a href="#" className="hover:text-cyan-500 transition-colors"><Github /></a>
              <a href="#" className="hover:text-cyan-500 transition-colors"><Dribbble /></a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-cyan-500 transition-colors">Write</a></li>
              <li><a href="#" className="hover:text-cyan-500 transition-colors">Read</a></li>
              <li><a href="#" className="hover:text-cyan-500 transition-colors">Discover</a></li>
              <li><a href="#" className="hover:text-cyan-500 transition-colors">Community</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-cyan-500 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-cyan-500 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-cyan-500 transition-colors">Guidelines</a></li>
              <li><a href="#" className="hover:text-cyan-500 transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-cyan-500 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-cyan-500 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-cyan-500 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-cyan-500 transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm">
          <p>&copy; 2024 BlogSpace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
