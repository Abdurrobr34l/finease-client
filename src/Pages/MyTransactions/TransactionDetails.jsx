import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import axios from "axios";
import {
  FaPlus,
  FaMinus,
  FaMoneyBillWave,
  FaHamburger,
  FaFilm,
  FaHome,
  FaBus,
  FaQuestion,
} from "react-icons/fa";

const TransactionDetails = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [categoryTotal, setCategoryTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://finease-server.vercel.app/my-transactions/${id}`)
      .then((res) => {
        setTransaction(res.data);

        axios
          .get(
            `https://finease-server.vercel.app/my-transactions?email=${res.data.userEmail}`
          )
          .then((allRes) => {
            const allTransactions = allRes.data;
            const sameCategory = allTransactions.filter(
              (t) => t.category === res.data.category
            );
            const total = sameCategory.reduce(
              (sum, t) => sum + parseFloat(t.amount),
              0
            );
            setCategoryTotal(total);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // Skeleton Loader
  if (loading)
    return (
      <section className="flex justify-center px-5 py-10">
        <div className="rounded-xl border border-base-200 overflow-hidden shadow-lg animate-pulse max-w-xl w-full p-6 md:p-8">
          <div className="h-40 w-40 mx-auto bg-gray-300 dark:bg-gray-700 rounded-xl mb-6"></div>
          <div className="space-y-3">
            <div className="h-6 w-3/4 bg-gray-400 dark:bg-gray-600 rounded mx-auto"></div>
            <div className="h-4 w-full bg-gray-400 dark:bg-gray-600 rounded"></div>
            <div className="h-4 w-full bg-gray-400 dark:bg-gray-600 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-400 dark:bg-gray-600 rounded"></div>
            <div className="h-8 w-full bg-gray-400 dark:bg-gray-600 rounded mt-4"></div>
          </div>
        </div>
      </section>
    );

  if (!transaction)
    return (
      <p className="text-center py-10 text-lg font-semibold text-red-500">
        Transaction not found.
      </p>
    );

  const { type, category, description, amount, date, userName, userEmail } =
    transaction;

  // Function to get the category/type icon
  const categoryIcon = () => {
    if (type === "Income") return <FaPlus className="text-success text-6xl" />;
    switch (category) {
      case "Salary":
        return <FaMoneyBillWave className="text-6xl" />;
      case "Food":
        return <FaHamburger className="text-6xl" />;
      case "Entertainment":
        return <FaFilm className="text-6xl" />;
      case "Home":
        return <FaHome className="text-6xl" />;
      case "Transport":
        return <FaBus className="text-6xl" />;
      case "Other":
        return <FaQuestion className="text-6xl" />;
      default:
        return <FaMinus className="text-6xl" />;
    }
  };

  return (
    <section className="flex justify-center px-5 py-10">
      <div className="card bg-base-100 p-6 md:p-8 max-w-xl w-full rounded-xl shadow-lg">
        {/* Category Icon */}
        <div className="flex justify-center mb-6">
          <div
            className={`h-40 w-40 flex items-center justify-center rounded-xl border border-base-200 shadow-md ${
              type === "Income" ? "bg-success/20" : "bg-error/20"
            }`}
          >
            {categoryIcon()}
          </div>
        </div>

        {/* Transaction Info */}
        <h2 className="text-3xl font-bold mb-4 text-center">
          {category} ({type})
        </h2>

        <div className="space-y-3 text-center md:text-left">
          <p>
            <span className="font-semibold">Description:</span> {description}
          </p>
          <p>
            <span className="font-semibold">Amount:</span>{" "}
            <span className="text-accent font-bold text-2xl">৳</span> {amount}
          </p>
          <p>
            <span className="font-semibold">Date:</span> {date}
          </p>
          <p>
            <span className="font-semibold">User Name:</span> {userName}
          </p>
          <p>
            <span className="font-semibold">User Email:</span> {userEmail}
          </p>
          <hr className="my-3 border-base-200" />
          <p className="text-lg font-semibold">
            Total in this category: ৳ {categoryTotal}
          </p>
        </div>

        <Link
          to={"/my-transactions"}
          className="btn btn-hover mt-6 w-full text-center"
        >
          Back
        </Link>
      </div>
    </section>
  );
};

export default TransactionDetails;
