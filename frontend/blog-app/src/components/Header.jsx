import React from 'react';
import { Search, Feather } from 'lucide-react';
import Button from './ui/button';
import { Input } from './ui/input';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold">BlogSpace</h1>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-500">
              <a href="#" className="hover:text-gray-900">Home</a>
              <a href="#" className="hover:text-gray-900">Explore</a>
              <a href="#" className="hover:text-gray-900">Categories</a>
              <a href="#" className="hover:text-gray-900">About</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input type="search" placeholder="Search articles..." className="pl-10 w-48" />
            </div>
            <Button variant="outline">
              <Feather className="h-4 w-4 mr-2" />
              Write
            </Button>
            <Button variant="ghost">Sign In</Button>
            <Button>Sign Up</Button>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
