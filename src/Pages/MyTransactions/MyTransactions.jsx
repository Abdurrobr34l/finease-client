import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import axios from 'axios';
import { FaEye, FaMinus, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router';
import { RxUpdate } from 'react-icons/rx';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';

const MyTransactions = () => {
  const { user } = useContext(AuthContext);

  const [transactions, setTransactions] = useState([]);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/my-transactions?sortBy=${sortField}&order=${sortOrder}`)
        .then(res => setTransactions(res.data))
        .catch(err => console.error(err));
    }
  }, [user, sortField, sortOrder]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will delete your transaction!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    })
      .then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://localhost:3000/delete-transaction/${id}`)
            .then(() => {
              const remaining = transactions.filter(t => t._id !== id);
              setTransactions(remaining);
              Swal.fire('Deleted!', 'Transaction has been deleted.', 'success');
            })
            .catch(() => {
              Swal.fire('Error', 'Failed to delete transaction', 'error');
            });
        }
      })
  }

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
    <section className="section-padding">

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

      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-10 xl:grid-cols-3'>
        {transactions.map(({ _id, type, category, amount, date }) => (
          <div key={_id} className={`rounded-xl ${type === 'Income' ? 'bg-success' : 'bg-error'}`}>
            <div className='ml-5 p-5 bg-base-100 rounded-r-lg border border-base-100'>
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

              <div className='flex gap-5'>
                <Link to={`/transactions-details/${_id}`} className='btn btn-hover inlin-block flex items-center gap-2 mt-4 w-[47%] bg-transparent!'>
                  <FaEye /> More Details
                </Link>
                <Link to={`/update-transaction/${_id}`} className='btn btn-hover inlin-block flex items-center gap-2 mt-4 w-[47%] bg-transparent!'>
                  <RxUpdate /> Update
                </Link>
              </div>

              <button
                onClick={() => handleDelete(_id)}
                className='btn inlin-block flex items-center gap-2 mt-4 w-full border-2 border-error text-white transition-colors common-hover-effect bg-transparent hover:text-error lg:col-span-12'
              >
                <MdDelete /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyTransactions;
