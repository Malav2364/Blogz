import React from 'react';
import Button from './ui/button';

const Hero = () => {
  return (
    <section className="relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative container mx-auto px-4 py-20 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">Share Your Story With The World</h1>
        <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">Join thousands of writers sharing their knowledge, experiences, and insights. Build your audience, connect with readers, and make your voice heard.</p>
        <div className="mt-8 flex justify-center space-x-4">
          <Button size="lg">Start Writing Today</Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black">Explore Articles</Button>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold">50K+</p>
            <p className="text-gray-300">Active Writers</p>
          </div>
          <div>
            <p className="text-4xl font-bold">2M+</p>
            <p className="text-gray-300">Articles Published</p>
          </div>
          <div>
            <p className="text-4xl font-bold">10M+</p>
            <p className="text-gray-300">Monthly Readers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
