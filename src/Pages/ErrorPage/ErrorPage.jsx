import React from 'react';
import notFoundImg from '../../assets/404.png';
import { HeadProvider } from 'react-head';
import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <>
      <HeadProvider>
        <title>FinEase | Error Page</title>
      </HeadProvider>

      <section className="section-padding flex flex-col items-center justify-center min-h-screen gap-6 text-center">
        {/* 404 Image */}
        <img
          src={notFoundImg}
          alt="Page Not Found"
          className="w-80 md:w-[500px] lg:w-[700px] object-contain"
        />

        {/* 404 Heading */}
        <h1 className="text-6xl font-bold text-primary">404</h1>

        {/* Subheading */}
        <h2 className="text-2xl font-semibold text-secondary">
          Oops! This page got lost.
        </h2>

        {/* Description */}
        <p className="text-base text-center text-gray-500 max-w-md">
          The page you’re looking for might have been removed or is temporarily
          unavailable. Let’s guide you back home where everything’s cozy.
        </p>

        {/* Go Home Button */}
        <Link
          to="/"
          className="btn btn-primary mt-4 px-6 py-3 btn-hover"
        >
          Go to Home
        </Link>
      </section>
    </>
  );
};

export default ErrorPage;