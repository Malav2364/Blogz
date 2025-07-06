import React from 'react';
import Button from './ui/button';
import { CheckCircle } from 'lucide-react';

const CTA = () => {
  return (
    <section className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-4xl font-bold">Ready to Share Your Voice?</h2>
        <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">Join our community of writers and start building your audience today. It's free, easy, and takes less than a minute to get started.</p>
        <div className="mt-10 flex justify-center gap-4">
          <Button size="lg">Create Your First Post</Button>
          <Button size="lg" variant="outline" className="text-white border-white/50 hover:bg-white hover:text-slate-900">Learn More</Button>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-400">
          <div className="flex items-center justify-center space-x-3">
            <CheckCircle className="h-6 w-6 text-cyan-500" />
            <span className="font-medium">Free to start</span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <CheckCircle className="h-6 w-6 text-cyan-500" />
            <span className="font-medium">Build an audience</span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <CheckCircle className="h-6 w-6 text-cyan-500" />
            <span className="font-medium">Professional tools</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
