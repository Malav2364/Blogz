import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Discover from '../components/Discover';
import Featured from '../components/Featured';
import Writers from '../components/Writers';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="bg-white">
      <Header />
      <main>
        <Hero />
        <Discover />
        <Featured />
        <Writers />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
