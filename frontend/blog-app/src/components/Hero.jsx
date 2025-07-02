import React from 'react';
import Button from './ui/button';

const Hero = () => {
  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">Share Your Story With The World</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Join thousands of writers sharing their knowledge, experiences, and insights. Build your audience, connect with readers, and make your voice heard.</p>
        <div className="mt-8 flex justify-center space-x-4">
          <Button size="lg">Start Writing Today</Button>
          <Button size="lg" variant="outline">Explore Articles</Button>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold">50K+</p>
            <p className="text-gray-500">Active Writers</p>
          </div>
          <div>
            <p className="text-4xl font-bold">2M+</p>
            <p className="text-gray-500">Articles Published</p>
          </div>
          <div>
            <p className="text-4xl font-bold">10M+</p>
            <p className="text-gray-500">Monthly Readers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
