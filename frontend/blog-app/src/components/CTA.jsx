import React from 'react';
import Button from './ui/button';
import { CheckCircle } from 'lucide-react';

const CTA = () => {
  return (
    <section className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold">Ready to Share Your Voice?</h2>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">Join our community of writers and start building your audience today. It's free, easy, and takes less than a minute to get started.</p>
        <div className="mt-8 flex justify-center space-x-4">
          <Button size="lg" variant="secondary">Create Your First Post</Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-gray-800">Learn More</Button>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-400">
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>Free to start</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>Build an audience</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>Professional tools</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
