import React from 'react';
import blog1 from '../../assets/blog-saving.webp';
import blog2 from '../../assets/blog-budget-planning.webp';
import blog3 from '../../assets/blog-investment.webp';
import { Link } from 'react-router';

const Blog = () => {
  const blogs = [
    {
      id: 1,
      image: blog1,
      title: "5 Tips to Save More Every Month",
      description: "Learn practical tips to save money effectively and grow your wealth gradually.",
      link: "/blog/1",
    },
    {
      id: 2,
      image: blog2,
      title: "How to Create a Smart Budget Plan",
      description: "Step-by-step guide to planning your monthly budget and controlling expenses.",
      link: "/blog/2",
    },
    {
      id: 3,
      image: blog3,
      title: "Investing for Beginners",
      description: "Understand the basics of investment and how to make your money work for you.",
      link: "/blog/3",
    },
  ];

  return (
    <section id='blog'>
      <h2 className="title text-center mb-10">
        Latest <span className="text-accent">Financial Tips</span>
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map(({ id, image, title, description, link }) => (
          <div
            key={id}
            className="bg-base-100 rounded-2xl overflow-hidden shadow-lg hover:-translate-y-2 transition-transform duration-300"
          >
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <div className="p-6 flex flex-col gap-3">
              <h3 className="text-xl font-semibold text-accent">{title}</h3>
              <p className="text-secondary">{description}</p>
              <Link
                to={link}
                className="mt-3 self-start btn btn-hover"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
