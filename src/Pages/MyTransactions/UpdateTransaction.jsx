import React, { useContext, useEffect, useState } from "react";
import { HeadProvider } from "react-head";
import { AuthContext } from "../../Contexts/AuthContext";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateTransaction = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "",
    category: "",
    amount: "",
    description: "",
    date: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch transaction
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://finease-server.vercel.app/my-transactions/${id}`)
      .then((res) => {
        setFormData(res.data);
      })
      .catch(() => {
        toast.error("Failed to load transaction");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateTransaction = (e) => {
    e.preventDefault();
    setUpdating(true);

    axios
      .put(
        `https://finease-server.vercel.app/update-transaction/${id}`,
        formData
      )
      .then(() => {
        toast.success("Transaction updated successfully!");
        navigate(`/transactions-details/${id}`);
      })
      .catch(() => {
        toast.error("Failed to update transaction");
      })
      .finally(() => setUpdating(false));
  };

  // Loading spinner
  if (loading) {
    return (
      <section className="section-padding flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-accent"></span>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center gap-10">
      <HeadProvider>
        <title>FinEase | Update Transaction</title>
      </HeadProvider>

      <h2 className="title">Update Transaction</h2>

      <form onSubmit={handleUpdateTransaction}>
        <fieldset className="fieldset transaction-form flex flex-col items-start p-6 w-[335px] bg-base-100 rounded-lg md:w-full lg:flex-row lg:gap-10">

          <div className="mt-3">
            <label className="label text-secondary">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="input h-[53px] w-full bg-base-300 rounded-lg"
              required
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>

            <label className="label text-secondary mt-3">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="select h-[53px] w-full bg-base-300 rounded-lg"
              required
            >
              <option value="">Select Category</option>
              <option value="Salary">Salary</option>
              <option value="Food">Food</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Home">Home</option>
              <option value="Transport">Transport</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="label text-secondary mt-3">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="input mb-3 py-6.5 w-full bg-base-300 rounded-lg"
            />

            <label className="label text-secondary mt-3">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="input mb-3 py-6.5 w-full bg-base-300 rounded-lg"
            />

            <label className="label text-secondary mt-3">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="input mb-4 py-6.5 w-full bg-base-300 rounded-lg"
            />
          </div>

          <div>
            <label className="label text-secondary mt-3">User Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input mb-3 h-[53px] w-full bg-base-300 rounded-lg cursor-not-allowed"
            />

            <label className="label text-secondary mt-3">User Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input mb-4 h-[53px] w-full bg-base-300 rounded-lg cursor-not-allowed"
            />

            <button
              type="submit"
              disabled={updating}
              className="btn btn-neutral mt-4 py-6 w-full btn-hover"
            >
              {updating ? "Updating..." : "Update Transaction"}
            </button>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default UpdateTransaction;
