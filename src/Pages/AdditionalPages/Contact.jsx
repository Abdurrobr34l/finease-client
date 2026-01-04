import React, { useState } from "react";
import { HeadProvider } from "react-head";
import { toast } from "react-toastify";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Just a demo - no backend
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Your message has been sent!");
      e.target.reset();
    }, 1000);
  };

  return (
    <section className="px-5">
      <HeadProvider>
        <title>FinEase | Contact</title>
      </HeadProvider>

      <h1 className="title text-center">Contact Us</h1>

      <form
        onSubmit={handleSubmit}
        className="mt-6 max-w-xl mx-auto flex flex-col gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="input py-6.5 w-full bg-base-300 rounded-lg"
          required
          disabled={isLoading}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="input py-6.5 w-full bg-base-300 rounded-lg"
          required
          disabled={isLoading}
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          className="input py-6.5 w-full bg-base-300 rounded-lg"
          required
          disabled={isLoading}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          className="textarea textarea-bordered py-6.5 w-full bg-base-300 rounded-lg"
          required
          disabled={isLoading}
        ></textarea>

        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-hover"
        >
          {isLoading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
};

export default Contact;
