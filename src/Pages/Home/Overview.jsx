import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext';

const Overview = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [overview, setOverview] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
  });
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true); // Start loading
    axios
      .get(`https://finease-server.vercel.app/my-transactions?email=${user.email}`)
      .then((res) => {
        setTransactions(res.data);

        // Calculate totals
        let totalIncome = 0;
        let totalExpense = 0;

        res.data.forEach((transaction) => {
          if (transaction.type === 'Income') totalIncome += Number(transaction.amount);
          else if (transaction.type === 'Expense') totalExpense += Number(transaction.amount);
        });

        const totalBalance = totalIncome - totalExpense;

        setOverview({
          totalBalance,
          totalIncome,
          totalExpense,
        });
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false)); // Stop loading
  }, [user?.email]);

  // Skeleton loader
  const SkeletonCard = () => (
    <div className="flex flex-col items-start bg-base-100 border border-base-100 rounded-2xl p-6 shadow-lg animate-pulse text-center">
      <div className="h-6 w-32 bg-base-300 rounded mb-4"></div>
      <div className="h-12 w-full bg-base-300 rounded mb-2"></div>
      <div className="h-6 w-24 bg-base-300 rounded mt-5"></div>
    </div>
  );

  return (
    <section>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8 lg:grid-cols-3 2xl:grid-cols-4">
        <h2 className="title md:text-justify!">
          Your <span className="text-accent">Financial</span> Overview
        </h2>

        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : transactions.length === 0 ? (
          <p className="text-center text-secondary col-span-full mt-5">
            No transactions found. Start by adding your first income or expense!
          </p>
        ) : (
          <>
            {/* Total Balance */}
            <div className="flex flex-col items-start bg-base-100 border border-base-100 rounded-2xl p-6 shadow-lg hover:-translate-y-2 transition-transform duration-300 text-center">
              <h3 className="text-xl font-semibold text-accent text-justify mb-2">
                Total Balance
              </h3>
              <p className="mt-2 text-secondary text-justify text-3xl">
                <span className="font-black text-5xl text-accent">৳</span>
                {overview.totalBalance.toLocaleString()}
              </p>
              <Link
                to={"/my-transactions"}
                className="flex items-center gap-2 mt-5 border-none bg-transparent! btn-hover"
              >
                View More Details <FaArrowRightLong />
              </Link>
            </div>

            {/* Income */}
            <div className="flex flex-col items-start bg-base-100 border border-base-100 rounded-2xl p-6 shadow-lg hover:-translate-y-2 transition-transform duration-300 text-center">
              <h3 className="text-xl font-semibold text-accent text-justify mb-2">
                Income
              </h3>
              <p className="mt-2 text-secondary text-justify text-3xl">
                <span className="font-black text-5xl text-accent">৳</span>
                {overview.totalIncome.toLocaleString()}
              </p>
              <Link
                to={"/my-transactions"}
                className="flex items-center gap-2 mt-5 border-none bg-transparent! btn-hover"
              >
                View More Details <FaArrowRightLong />
              </Link>
            </div>

            {/* Expenses */}
            <div className="flex flex-col items-start bg-base-100 border border-base-100 rounded-2xl p-6 shadow-lg hover:-translate-y-2 transition-transform duration-300 text-center">
              <h3 className="text-xl font-semibold text-accent text-justify mb-2">
                Expenses
              </h3>
              <p className="mt-2 text-secondary text-justify text-3xl">
                <span className="font-black text-5xl text-accent">৳</span>
                {overview.totalExpense.toLocaleString()}
              </p>
              <Link
                to={"/my-transactions"}
                className="flex items-center gap-2 mt-5 border-none bg-transparent! btn-hover"
              >
                View More Details <FaArrowRightLong />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Overview;
