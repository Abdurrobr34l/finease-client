import React from "react";
import { Link } from "react-router";

const CTA = () => {
  return (
    <section className="relative bg-primary/90 dark:bg-primary-dark/90 py-20 px-5 rounded-xl text-center flex flex-col items-center justify-center gap-6">
      <h2 className="text-4xl md:text-5xl font-bold text-base-200!">
        Take Control of Your <span className="text-accent">Finances Today</span>
      </h2>
      <p className="text-base-200 md:text-lg max-w-xl">
        Start managing your money, track your expenses, and plan your financial future with <strong>FinEase</strong>. It’s simple, smart, and secure.
      </p>
      <Link
        to="/signup"
        className="btn btn-hover common-hover-effect"
      >
        Get Started
      </Link>
      {/* Optional smooth fade-in for decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 animate-bounce">
        <span className="inline-block w-6 h-6 border-b-4 border-r-4 border-base-100 rotate-45"></span>
      </div>
    </section>
  );
};

export default CTA;
