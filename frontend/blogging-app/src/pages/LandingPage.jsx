import React from 'react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import FeaturedArticles from '../components/FeaturedArticles';
import Writers from '../components/Writers';
import CallToAction from '../components/CallToAction';

const LandingPage = () => {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedArticles />
      <Writers />
      <CallToAction />
    </>
  );
};

export default LandingPage;
