import { HeadProvider } from "react-head";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";

function AddTransaction() {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddTransaction = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("You must be logged in to add a transaction.");
      return;
    }

    const form = e.target;

    const type = form.type.value;
    const category = form.category.value;
    const amount = Number(form.amount.value);
    const description = form.description.value.trim();
    const date = form.date.value;

    // Basic validation
    if (!category) {
      toast.error("Please select a category.");
      return;
    }

    if (amount <= 0) {
      toast.error("Amount must be greater than zero.");
      return;
    }

    if (description.length < 3) {
      toast.error("Description must be at least 3 characters.");
      return;
    }

    const transactionData = {
      type,
      category,
      amount,
      description,
      date,
      userEmail: user.email,
      userName: user.displayName || "Unknown",
    };

    setIsLoading(true);

    try {
      await axios.post(
        "https://finease-server.vercel.app/add-transaction",
        transactionData
      );

      toast.success("Transaction added successfully!");
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add transaction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center gap-10">
      <HeadProvider>
        <title>FinEase | Add Transaction</title>
      </HeadProvider>

      <h2 className="title">Add New Transaction</h2>

      <form onSubmit={handleAddTransaction}>
        <fieldset className="fieldset transaction-form flex flex-col items-start p-6 w-[335px] bg-base-100 rounded-lg md:w-full lg:flex-row lg:gap-10">
          
          {/* LEFT COLUMN */}
          <div className="mt-3 w-full">
            <label className="label text-secondary">Type</label>
            <select
              name="type"
              className="input h-[53px] w-full bg-base-300 rounded-lg"
              disabled={isLoading}
              required
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>

            <label className="label text-secondary mt-3">Category</label>
            <select
              name="category"
              className="select h-[53px] w-full bg-base-300 rounded-lg"
              disabled={isLoading}
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

          {/* MIDDLE COLUMN */}
          <div className="w-full">
            <label className="label text-secondary mt-3">Amount</label>
            <input
              type="number"
              name="amount"
              placeholder="Amount in BDT"
              className="input py-6.5 w-full bg-base-300 rounded-lg"
              disabled={isLoading}
              required
            />

            <label className="label text-secondary mt-3">Description</label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              className="input py-6.5 w-full bg-base-300 rounded-lg"
              disabled={isLoading}
              required
            />

            <label className="label text-secondary mt-3">Date</label>
            <input
              type="date"
              name="date"
              className="input py-6.5 w-full bg-base-300 rounded-lg"
              disabled={isLoading}
              required
            />
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-full">
            <label className="label text-secondary mt-3">User Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input h-[53px] w-full bg-base-300 rounded-lg cursor-not-allowed"
            />

            <label className="label text-secondary mt-3">User Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input h-[53px] w-full bg-base-300 rounded-lg cursor-not-allowed"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-neutral mt-6 py-6 w-full btn-hover disabled:opacity-70"
            >
              {isLoading ? "Adding..." : "Add Transaction"}
            </button>
          </div>

        </fieldset>
      </form>
    </section>
  );
}

export default AddTransaction;
