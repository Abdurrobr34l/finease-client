import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import axios from "axios";

const TransactionDetails = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [categoryTotal, setCategoryTotal] = useState(0);

  useEffect(() => {
    axios.get(`https://finease-server.vercel.app/my-transactions/${id}`)
      .then(res => {
        setTransaction(res.data);

        axios.get(`https://finease-server.vercel.app/my-transactions?email=${res.data.userEmail}`)
          .then(allResponse => {
            const allTransactions = allResponse.data;
            const sameCategory = allTransactions.filter(
              transaction => transaction.category === res.data.category
            );
            const total = sameCategory.reduce(
              (sum, transaction) => sum + parseFloat(transaction.amount),
              0
            );
            setCategoryTotal(total);
          });
      })
      .catch(err => console.log(err));
  }, [id]);


  if (!transaction) return <p className="text-center py-10">Loading...</p>;

  const { type, category, description, amount, date, userName, userEmail } = transaction;

  return (
    <section className="flex justify-center">
      <div className="card bg-base-100 p-8 max-w-lg w-full rounded-xl shadow">
        <h2 className="text-3xl font-bold mb-6 text-center">{category} ({type})</h2>

        <div className="space-y-3">
          <p>Description: {description}</p>
          <p>Amount: {amount} BDT</p>
          <p>Date: {date}</p>
          <p>User Name: {userName}</p>
          <p>User Email: {userEmail}</p>
          <hr />
          <p className="text-lg font-semibold">
            Total in this category: {categoryTotal} BDT
          </p>
        </div>

        <Link to={"/my-transactions"} className="btn btn-hover mt-5">Back</Link>
      </div>
    </section>
  );
};

export default TransactionDetails;
