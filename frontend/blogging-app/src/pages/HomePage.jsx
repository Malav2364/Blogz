import React from 'react';
import MainContent from '../components/home/MainContent';
import Sidebar from '../components/home/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <MainContent />
          <Sidebar />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
