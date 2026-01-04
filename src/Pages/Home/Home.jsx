import React from 'react';
import Banner from './Banner';
import BudgetingTips from './BudgetingTips';
import { HeadProvider } from 'react-head';
import Planning from './Planning';
import Overview from './Overview';
import Testimonials from './Testimonials';
import Features from './Features';
import Blog from './Blog';
import Newsletter from './Newsletter';
import FAQ from './FAQ';
import CTA from './CTA';

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
      <CTA></CTA>
      <Newsletter></Newsletter>
      <FAQ></FAQ>
    </>
  );
};

export default Home;