import React from 'react';
import { FaPiggyBank, FaChartLine, FaShieldAlt, FaCalendarCheck, FaWallet, FaBullseye, FaLightbulb, FaBalanceScale } from "react-icons/fa";
import { Link } from 'react-router';

const Planning = () => {
  const planningData = [
    {
      id: 1,
      icon: <FaPiggyBank className="text-4xl text-accent" />,
      title: "Smart Saving",
      description: "Build your savings gradually by setting clear and achievable financial goals."
    },
    {
      id: 2,
      icon: <FaChartLine className="text-4xl text-accent" />,
      title: "Track Income & Expenses",
      description: "Monitor your income and expenses to understand where your money goes each month."
    },
    {
      id: 3,
      icon: <FaShieldAlt className="text-4xl text-accent" />,
      title: "Emergency Fund",
      description: "Always keep a financial cushion ready to face unexpected situations or crises."
    },
    {
      id: 4,
      icon: <FaCalendarCheck className="text-4xl text-accent" />,
      title: "Monthly Budgeting",
      description: "Plan and adjust your monthly budget to maintain spending discipline."
    },
    {
      id: 5,
      icon: <FaWallet className="text-4xl text-accent" />,
      title: "Debt Management",
      description: "Keep track of loans and repayments to reduce financial stress and interest costs."
    },
    {
      id: 6,
      icon: <FaBullseye className="text-4xl text-accent" />,
      title: "Goal Planning",
      description: "Save strategically for travel, education, or future investments."
    },
    {
      id: 7,
      icon: <FaLightbulb className="text-4xl text-accent" />,
      title: "Smart Investments",
      description: "Make informed investment decisions for long-term financial growth."
    },
    {
      id: 8,
      icon: <FaBalanceScale className="text-4xl text-accent" />,
      title: "Balanced Lifestyle",
      description: "Find a healthy balance between saving, spending, and enjoying your life."
    }
  ];

  return (
    <>
      <section id='planning'>
        <div className='hidden mb-12 2xl:flex items-center justify-between'>
          <h2 class="title">Why <span className='text-accent'>Financial Planning</span> Matters</h2>
          <Link to={"/"} className='btn btn-hover place-content-end text-end'>Read More</Link>
        </div>

        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8 lg:grid-cols-3 2xl:grid-cols-4'>
          <div className='2xl:hidden'>
            <h2 class="title mb-6 md:text-justify! xl:text-[44px]!">Why <span className='text-accent'>Financial Planning</span> Matters</h2>
            <Link to={"/"} className='btn btn-hover place-content-end text-end'>Read More</Link>
          </div>

          {
            planningData.map(({ id, icon, title, description }) => (
              <div key={id} className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg hover:-translate-y-2 transition-transform duration-300 text-center">
                <div className="flex justify-center mb-4">{icon}</div>
                <h3 className="text-xl font-semibold text-accent mb-2">{title}</h3>
                <p className="text-secondary">{description}</p>
              </div>
            ))
          }
        </div>
      </section>
    </>
  );
};

export default Planning;