import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaPlus,
  FaMinus,
  FaMoneyBillWave,
  FaHamburger,
  FaFilm,
  FaHome,
  FaBus,
  FaQuestion,
  FaEye,
} from 'react-icons/fa';
import { Link } from 'react-router';
import { HeadProvider } from 'react-head';
import { AuthContext } from '../../Contexts/AuthContext';

const MyTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sorting
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const { user } = useContext(AuthContext);

  // Fetch user transactions only once
  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    axios
      .get(`https://finease-server.vercel.app/my-transactions?email=${user.email}`)
      .then(res => {
        setTransactions(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  // Filter & Search locally
  let filteredTransactions = transactions
    .filter(t => categoryFilter === "All" || t.category === categoryFilter)
    .filter(t => t.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.type?.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(t => !minAmount || t.amount >= minAmount)
    .filter(t => !maxAmount || t.amount <= maxAmount);

  // Sort locally
  filteredTransactions.sort((a, b) => {
    if (sortField === "amount") {
      return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
    } else if (sortField === "date" || sortField === "createdAt") {
      return sortOrder === "asc"
        ? new Date(a[sortField]) - new Date(b[sortField])
        : new Date(b[sortField]) - new Date(a[sortField]);
    }
    return 0;
  });

  return (
    <section className="px-5 py-10">
      <HeadProvider>
        <title>FinEase | Explore Transactions</title>
      </HeadProvider>

      <h2 className='title mb-8'>My Transactions</h2>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by category or type"
          className="input input-bordered flex-1 w-[300px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="select select-bordered"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Salary">Salary</option>
          <option value="Food">Food</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Home">Home</option>
          <option value="Transport">Transport</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="number"
          placeholder="Min Amount"
          className="input input-bordered w-32"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Amount"
          className="input input-bordered w-32"
          value={maxAmount}
          onChange={(e) => setMaxAmount(e.target.value)}
        />

        <select
          className="select select-bordered"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="createdAt">Newest</option>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>

        <select
          className="select select-bordered"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      {/* Transactions Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className='rounded-xl border border-base-200 overflow-hidden shadow-lg animate-pulse'>
              <div className='p-5 bg-gray-300 dark:bg-gray-700 h-48 flex flex-col justify-between'>
                <div className='h-6 w-1/3 bg-gray-400 dark:bg-gray-600 rounded mb-4'></div>
                <div className='h-4 w-2/3 bg-gray-400 dark:bg-gray-600 rounded mb-2'></div>
                <div className='h-4 w-1/2 bg-gray-400 dark:bg-gray-600 rounded'></div>
                <div className='flex gap-2 mt-4'>
                  <div className='h-8 w-1/2 bg-gray-400 dark:bg-gray-600 rounded'></div>
                  <div className='h-8 w-1/2 bg-gray-400 dark:bg-gray-600 rounded'></div>
                </div>
              </div>
            </div>
          ))
          : filteredTransactions.map(({ _id, type, category, amount, date }) => (
            <div key={_id} className="rounded-xl bg-base-100 border border-base-200 overflow-hidden shadow-lg">
              {/* Icon */}
              <div className={`h-40 bg-base-200/60 flex items-center justify-center text-6xl ${type === 'Income' ? 'text-success' : 'text-error'}`}>
                {type === 'Income' ? <FaPlus /> : (
                  <>
                    {category === 'Salary' && <FaMoneyBillWave />}
                    {category === 'Food' && <FaHamburger />}
                    {category === 'Entertainment' && <FaFilm />}
                    {category === 'Home' && <FaHome />}
                    {category === 'Transport' && <FaBus />}
                    {category === 'Other' && <FaQuestion />}
                    {!['Salary', 'Food', 'Entertainment', 'Home', 'Transport', 'Other'].includes(category) && <FaMinus />}
                  </>
                )}
              </div>

              {/* Card Body */}
              <div className='ml-5 p-5 flex flex-col'>
                <div className='flex items-center gap-2 pb-4'>
                  <span className={`p-2 rounded-lg ${type === 'Income' ? 'bg-success' : 'bg-error'}`}>
                    {type === 'Income' ? <FaPlus /> : <FaMinus />}
                  </span>
                  <span className={`font-bold text-2xl ${type === 'Income' ? 'text-success' : 'text-error'}`}>
                    {type}
                  </span>
                </div>

                <div className='flex flex-col gap-1 py-4 border-t border-b'>
                  <h2 className='text-2xl'>{category}</h2>
                  <p className='text-3xl'><span className='text-4xl font-bold text-accent'>৳</span> {amount}</p>
                  <span>{date}</span>
                </div>

                <Link to={`/transactions-details/${_id}`} className='btn btn-hover flex items-center gap-2 mt-4 w-full justify-center'>
                  <FaEye /> View Details
                </Link>
              </div>
            </div>
          ))
        }
      </div>
    </section>
  );
};

export default MyTransactions;
