import React from "react";
import { HeadProvider } from "react-head";

const About = () => {
  return (
    <section className="px-5 py-10">
      <HeadProvider>
        <title>FinEase | About</title>
      </HeadProvider>

      <h2 className="title text-center">About FinEase</h2>

      <p className="mt-6 text-lg max-w-3xl mx-auto text-center">
        FinEase is a personal finance management app designed to help you track income, expenses, and savings goals. 
        With intuitive reports, charts, and budgeting tools, you can take control of your finances, make smarter decisions, and plan for the future.
      </p>

      <div className="mt-10 flex flex-col md:flex-row justify-center items-center gap-10">
        <div className="p-6 bg-base-100 rounded-lg shadow-md text-center">
          <h2 className="font-bold text-2xl mb-2">Track Income</h2>
          <p>Log all your earnings and know exactly where your money is coming from.</p>
        </div>
        <div className="p-6 bg-base-100 rounded-lg shadow-md text-center">
          <h2 className="font-bold text-2xl mb-2">Manage Expenses</h2>
          <p>Record every expense and categorize it for better budgeting and control.</p>
        </div>
        <div className="p-6 bg-base-100 rounded-lg shadow-md text-center">
          <h2 className="font-bold text-2xl mb-2">Visual Reports</h2>
          <p>Get clear charts and insights to make smarter financial decisions.</p>
        </div>
      </div>
    </section>
  );
};

export default About;
