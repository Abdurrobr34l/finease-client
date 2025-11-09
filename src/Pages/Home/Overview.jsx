import React from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from 'react-router';

const Overview = () => {
  return (
    <section>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8 lg:grid-cols-3 2xl:grid-cols-4'>
        <h2 class="title md:text-justify!">Your <span className='text-accent'>Financial</span> Overview</h2>

        <div className="flex flex-col items-start bg-base-100 border border-base-100 rounded-2xl p-6 shadow-lg hover:-translate-y-2 transition-transform duration-300 text-center">
          <h3 className="text-xl font-semibold text-accent text-justify mb-2">Total Balance</h3>
          <p className="mt-2 text-secondary text-justify text-3xl"><span className='font-black text-5xl text-accent'>৳</span>50,000</p>
          <Link to={"/"} className='flex items-center gap-2 mt-5 border-none bg-transparent! btn-hover'>View More Details <span><FaArrowRightLong/></span></Link>
        </div>

        <div className="flex flex-col items-start bg-base-100 border border-base-100 rounded-2xl p-6 shadow-lg hover:-translate-y-2 transition-transform duration-300 text-center">
          <h3 className="text-xl font-semibold text-accent text-justify mb-2">Income</h3>
          <p className="mt-2 text-secondary text-justify text-3xl"><span className='font-black text-5xl text-accent'>৳</span>30,000</p>
          <Link to={"/"} className='flex items-center gap-2 mt-5 border-none bg-transparent! btn-hover'>View More Details <span><FaArrowRightLong/></span></Link>
        </div>

        <div className="flex flex-col items-start bg-base-100 border border-base-100 rounded-2xl p-6 shadow-lg hover:-translate-y-2 transition-transform duration-300 text-center">
          <h3 className="text-xl font-semibold text-accent text-justify mb-2">Expenses</h3>
          <p className="mt-2 text-secondary text-justify text-3xl"><span className='font-black text-5xl text-accent'>৳</span>20,000</p>
          <Link to={"/"} className='flex items-center gap-2 mt-5 border-none bg-transparent! btn-hover'>View More Details <span><FaArrowRightLong/></span></Link>
        </div>

      </div>
    </section>
  );
};

export default Overview;