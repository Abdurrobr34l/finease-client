import React from 'react';
import Banner from './Banner';
import BudgetingTips from './BudgetingTips';
import { HeadProvider } from 'react-head';
import Planning from './Planning';
import Overview from './Overview';
import Testimonials from './Testimonials';
import Features from './Features';
import Blog from './Blog';

const Home = () => {
  return (
    <>    
      <HeadProvider>
        <title>FinEase | Home</title>
      </HeadProvider>

      <Banner></Banner>
      <Overview></Overview>
      <BudgetingTips></BudgetingTips>
      <Planning></Planning>

      <Testimonials></Testimonials>
      <Features></Features>
      <Blog></Blog>
    </>
  );
};

export default Home;