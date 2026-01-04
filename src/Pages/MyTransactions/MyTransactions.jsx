import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import axios from 'axios';
// import { FaEye, FaMinus, FaPlus, FaUser } from 'react-icons/fa';
import {
  FaPlus,
  FaMinus,
  FaMoneyBillWave,
  FaHamburger,
  FaFilm,
  FaHome,
  FaEye,
  FaBus,
  FaQuestion,
} from 'react-icons/fa';
import { Link } from 'react-router';
import { RxUpdate } from 'react-icons/rx';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import { HeadProvider } from 'react-head';

const MyTransactions = () => {
  const { user } = useContext(AuthContext);

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    if (user?.email) {
      const userEmail = user.email;
      setLoading(true);

      axios
        .get(`https://finease-server.vercel.app/my-transactions?email=${userEmail}&sortBy=${sortField}&order=${sortOrder}`)
        .then(res => {
          setTransactions(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user, sortField, sortOrder]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will delete your transaction!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://finease-server.vercel.app/delete-transaction/${id}`)
          .then(() => {
            const remaining = transactions.filter(t => t._id !== id);
            setTransactions(remaining);
            Swal.fire('Deleted!', 'Transaction has been deleted.', 'success');
          })
          .catch(() => {
            Swal.fire('Error', 'Failed to delete transaction', 'error');
          });
      }
    });
  };

  // Number of skeleton cards to show
  const skeletonCount = transactions.length > 0 ? transactions.length : 6;

  return (
    <section>
      <HeadProvider>
        <title>FinEase | My Transactions</title>
      </HeadProvider>

      <div className="flex items-center justify-end gap-4 mb-5">
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="select select-bordered"
        >
          <option value="createdAt">Newest</option>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="select select-bordered"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      {(!loading && transactions.length === 0) && (
        <div className="max-w-2xl mx-auto text-center p-8 bg-base-100 rounded-lg shadow">
          <h3 className="text-2xl font-bold mb-3">No transactions yet</h3>
          <p className="text-secondary mb-6">
            You don't have any transactions. Start by adding your first income or expense.
          </p>
          <Link to="/add-transaction" className="btn btn-hover">
            Add Transaction
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-10 xl:grid-cols-3">
        {loading
          ? Array.from({ length: skeletonCount }).map((_, i) => (
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
          : transactions.map(({ _id, type, category, amount, date }) => (
            <div key={_id} className="rounded-xl mt-5 lg:mt-10 bg-base-100 border border-base-200 overflow-hidden shadow-lg">
              {/* Conditional Icon as Image */}
              <div
                className={`h-40 bg-base-200/60 flex items-center justify-center text-6xl ${type === 'Income' ? 'text-success' : 'text-error'
                  }`}
              >
                {type === 'Income' ? (
                  <FaPlus />
                ) : (
                  <>
                    {category === 'Salary' && <FaMoneyBillWave />}
                    {category === 'Food' && <FaHamburger />}
                    {category === 'Entertainment' && <FaFilm />}
                    {category === 'Home' && <FaHome />}
                    {category === 'Transport' && <FaBus />}
                    {category === 'Other' && <FaQuestion />}
                    {/* fallback if no category matched */}
                    {!['Salary', 'Food', 'Entertainment', 'Home', 'Transport', 'Other'].includes(category) && <FaMinus />}
                  </>
                )}
              </div>

              {/* Card Body */}
              <div className='ml-5 p-5 bg-base-100 rounded-r-lg border border-base-100 flex flex-col'>
                {/* Type & Category */}
                <div className='flex items-center gap-2 pb-4'>
                  <span className={`p-2 rounded-lg ${type === 'Income' ? 'bg-success' : 'bg-error'}`}>
                    {type === 'Income' ? <FaPlus /> : <FaMinus />}
                  </span>
                  <span className={`font-bold text-2xl ${type === 'Income' ? 'text-success' : 'text-error'}`}>
                    {type}
                  </span>
                </div>

                {/* Details */}
                <div className='flex flex-col gap-1 py-4 border-t border-b'>
                  <h2 className='text-2xl'>{category}</h2>
                  <p className='text-3xl'><span className='text-4xl font-bold text-accent'>৳</span> {amount}</p>
                  <span>{date}</span>
                </div>

                {/* Buttons */}
                <div className='flex gap-5'>
                  <Link to={`/transactions-details/${_id}`} className='btn btn-hover flex items-center gap-2 mt-4 w-[47%]'>
                    <FaEye /> More Details
                  </Link>
                  <Link to={`/update-transaction/${_id}`} className='btn btn-hover flex items-center gap-2 mt-4 w-[47%]'>
                    <RxUpdate /> Update
                  </Link>
                </div>

                <button
                  onClick={() => handleDelete(_id)}
                  className='btn flex items-center gap-2 mt-4 w-full border-2 border-error text-white transition-colors hover:text-error bg-transparent'
                >
                  <MdDelete /> Delete
                </button>
              </div>
            </div>

          ))
        }
      </div>
    </section>
  );
};

export default MyTransactions;
