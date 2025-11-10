import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import axios from 'axios';
import { FaEye, FaMinus, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router';
import { RxUpdate } from 'react-icons/rx';
import { MdDelete } from 'react-icons/md';

const MyTransactions = () => {
  const { user } = useContext(AuthContext)
  // console.log(user);
  const [transactions, setTransactions] = useState([])
  // console.log(transactions);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/my-transactions?email=${user.email}`)
        .then(res => setTransactions(res.data))
        .catch(err => console.error(err));
    }
  }, [user])

    if (!transactions || transactions.length === 0) {
    return (
      <section className="section-padding">
        <div className="max-w-2xl mx-auto text-center p-8 bg-base-100 rounded-lg shadow">
          <h3 className="text-2xl font-bold mb-3">No transactions yet</h3>
          <p className="text-secondary mb-6">
            You don't have any transactions. Start by adding your first income or expense.
          </p>
          <Link to="/add-transaction" className="btn btn-hover">
            Add Transaction
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className='section-padding'>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-10 xl:grid-cols-3'>
        {
          transactions.map(({ _id, type, category, amount, date }) => (
            <div key={_id} className={`rounded-xl ${type === 'Income' ? 'bg-success' : 'bg-error'
              }`}>
              {/* Category */}
              <div className='ml-5 p-5 bg-base-100 rounded-r-lg border border-base-100'>
                <div className='flex items-center gap-2 pb-4'>
                  <span
                    className={`p-2 rounded-lg ${type === 'Income' ? 'bg-success' : 'bg-error'
                      }`}
                  >
                    {type === 'Income' ? <FaPlus /> : <FaMinus />}
                  </span>

                  <span
                    className={`font-bold text-2xl ${type === 'Income' ? 'text-success' : 'text-error'
                      }`}
                  >
                    {type}
                  </span>
                </div>

                {/* Contents */}
                <div className='flex flex-col gap-1 py-4 border-t border-b'>
                  <h2 className='text-2xl'>{category}</h2>
                  <p className='text-3xl'><span className='text-4xl font-bold text-accent'>৳</span> {amount}</p>
                  <span>{date}</span>
                </div>

                {/* Buttons */}
                <div className='flex gap-5'>
                  <Link to={`/transactions-details/${_id}`} className='btn btn-hover inlin-block flex items-center gap-2 mt-4 w-[47%] bg-transparent!'>
                    <FaEye />
                    view More
                  </Link>

                  <Link className='btn btn-hover inlin-block flex items-center gap-2 mt-4 w-[47%] bg-transparent!'>
                    <RxUpdate />
                    Update
                  </Link>
                </div>
                <button className='btn inlin-block flex items-center gap-2 mt-4 w-full border-2 border-error text-white transition-colors common-hover-effect bg-transparent hover:text-error lg:col-span-12'>
                  <MdDelete />
                  Delete
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