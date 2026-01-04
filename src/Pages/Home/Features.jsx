import React from 'react';
import { FaWallet, FaChartPie, FaCalendarCheck, FaShield  } from 'react-icons/fa6';

const featuresData = [
  {
    id: 1,
    icon: <FaWallet className="text-4xl text-accent" />,
    title: "Expense Tracking",
    description: "Monitor your income and expenses in real-time with easy-to-read charts.",
  },
  {
    id: 2,
    icon: <FaChartPie className="text-4xl text-accent" />,
    title: "Financial Analytics",
    description: "Get insights into your spending patterns and optimize your budget effectively.",
  },
  {
    id: 3,
    icon: < FaShield className="text-4xl text-accent" />,
    title: "Secure & Private",
    description: "Your data is encrypted and secure. Privacy is our top priority.",
  },
  {
    id: 4,
    icon: <FaCalendarCheck  className="text-4xl text-accent" />,
    title: "Goal Planning",
    description: "Set savings goals and track your progress to achieve financial freedom.",
  },
];

const Features = () => {
  return (
    <section id='features'>
      <h2 className="title text-start! mb-12">
        App <span className="text-accent">Features</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-8">
        {featuresData.map(({ id, icon, title, description }) => (
          <div
            key={id}
            className="flex flex-col items-center p-6 bg-base-100 rounded-2xl shadow-lg hover:-translate-y-2 transition-transform duration-300 text-center"
          >
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-accent mb-2">{title}</h3>
            <p className="text-secondary">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
