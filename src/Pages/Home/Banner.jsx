import React from 'react';
import bannerImgage from '../../assets/banner-image.svg';
import { Link } from 'react-router';

const Banner = () => {
  return (
    <section>
       <div className="hero-content flex-col lg:flex-row-reverse gap-10 p-0 xl:justify-between">
        {/* Right side image */}
        <img
          src={bannerImgage}
          alt="Financial Growth"
          className="md:max-w-lg lg:max-w-sm xl:max-w-lg"
        />

        {/* Left side text */}
        <div className='flex flex-col items-center text-center lg:items-start lg:pr-20 lg:text-justify xl:max-w-1/2'>
          <h1 className="mb-4 text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl">
            Take Control of <span className='text-accent'>Your Finances</span>
          </h1>
          <p className="py-2 leading-relaxed md:max-w-xl">
            Start your journey towards financial freedom. Save smart, invest wisely, 
            and watch your money grow with <span className="font-semibold text-primary">FinEase</span>.
          </p>
          <Link to="/" className="btn btn-hover mt-3">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;