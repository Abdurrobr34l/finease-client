import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    // You can add axios POST request here to save the email
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="section-padding bg-primary/10 rounded-xl">
      <div className="max-w-4xl mx-auto text-center flex flex-col gap-6 px-5">
        <h2 className="title text-3xl md:text-4xl">
          Stay Updated with <span className="text-accent">FinEase</span>
        </h2>
        <p className="text-secondary text-lg md:text-xl">
          Subscribe to our newsletter for the latest financial tips, tools, and updates.
        </p>

        {submitted ? (
          <p className="text-green-500 font-semibold text-lg">Thank you for subscribing!</p>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input py-6.5 w-full bg-base-300 rounded-lg sm:w-96"
              required
            />
            <button type="submit" className="btn btn-neutral py-6 w-full btn-hover sm:w-auto">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
