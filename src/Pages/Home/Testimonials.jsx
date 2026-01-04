import React, { useState } from 'react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa6';

const testimonialsData = [
  {
    id: 1,
    name: "Ayesha Rahman",
    role: "Entrepreneur",
    message: "FinEase helped me track my expenses easily and save for my business goals. Highly recommended!",
  },
  {
    id: 2,
    name: "Rafiq Ahmed",
    role: "Student",
    message: "I love the budgeting tips and the clear financial overview. It’s very easy to use and motivates me to save more.",
  },
  {
    id: 3,
    name: "Sadia Islam",
    role: "Freelancer",
    message: "With FinEase, I finally have control over my finances. The insights and planning tools are amazing!",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const prevTestimonial = () => {
    setCurrent((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrent((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id='testimonial'>
      <h2 className="title text-center mb-12">
        What Our <span className="text-accent">Users Say</span>
      </h2>

      <div className="relative max-w-4xl mx-auto">
        {/* Testimonial Card */}
        {testimonialsData.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`transition-all duration-700 pb-16 ${
              index === current ? "opacity-100 relative" : "opacity-0 absolute top-0 left-0"
            } bg-base-100 p-8 rounded-2xl shadow-lg text-center flex flex-col items-center gap-4`}
          >
            <FaQuoteLeft className="text-3xl text-accent" />
            <p className="text-lg text-secondary">{testimonial.message}</p>
            <FaQuoteRight className="text-3xl text-accent" />
            <h3 className="text-xl font-semibold text-accent mt-4">{testimonial.name}</h3>
            <span className="text-sm text-secondary">{testimonial.role}</span>
          </div>
        ))}

        {/* Navigation Buttons */}
        <div className="absolute flex justify-center gap-4 bottom-2 left-1/2 transform -translate-x-1/2">
          <button onClick={prevTestimonial} className="btn btn-circle btn-hover" aria-label="Previous testimonial">
            ❮
          </button>
          <button onClick={nextTestimonial} className="btn btn-circle btn-hover" aria-label="Next testimonial">
            ❯
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
