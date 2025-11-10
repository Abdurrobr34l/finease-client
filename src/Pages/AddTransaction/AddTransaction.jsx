import { HeadProvider } from "react-head";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";

function AddTransaction() {
  const { user } = useContext(AuthContext);

  const handleAddTransaction = (e) => {
    e.preventDefault();

    const userEmail = user?.email || "";
    const userName = user?.displayName || "";

    const type = e.target.type.value;
    const category = e.target.category.value;
    const amount = e.target.amount.value;
    const description = e.target.description.value;
    const date = e.target.date.value;

    const transactionData = {
      type,
      category,
      amount: Number(amount),
      description,
      date,
      userEmail,
      userName,
    };
    // console.log(user);

    axios
      .post("http://localhost:3000/add-transaction", transactionData)
      .then((res) => {
        // You can check res.data if needed
        toast.success("Transaction added successfully!");
        e.target.reset(); // Reset the form
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to add transaction");
      });
  };

  return (
    <section className="section-padding flex flex-col items-center gap-10">
      <HeadProvider>
        <title>FinEase | Add Transaction</title>
      </HeadProvider>

      <h2 className="title">Add New Transaction</h2>

      <form onSubmit={handleAddTransaction}>
        <fieldset className="fieldset transaction-form flex flex-col items-start p-6 w-[335px] bg-base-100 rounded-lg md:w-full lg:flex-row lg:gap-10">

          <div className="mt-3">
            {/* Type */}
            <label className="label text-secondary">Type</label>
            <select
              name="type"
              className="input h-[53px] w-full bg-base-300 rounded-lg"
              required
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>

            {/* Category */}
            <label className="label text-secondary mt-3">Category</label>
            <select
              name="category"
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
            {/* Amount */}
            <label className="label text-secondary mt-3">Amount</label>
            <input
              type="number"
              name="amount"
              placeholder="Amount in BDT"
              required
              className="input mb-3 py-6.5 w-full bg-base-300 rounded-lg"
            />

            {/* Description */}
            <label className="label text-secondary mt-3">Description</label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              required
              className="input mb-3 py-6.5 w-full bg-base-300 rounded-lg"
            />

            {/* Date */}
            <label className="label text-secondary mt-3">Date</label>
            <input
              type="date"
              name="date"
              required
              className="input mb-4 py-6.5 w-full bg-base-300 rounded-lg"
            />
          </div>

          <div>
            {/* User Email (Read-only) */}
            <label className="label text-secondary mt-3">User Email</label>
            <input
              type="email"
              name="userEmail"
              value={user?.email || ""}
              readOnly
              className="input mb-3 h-[53px] w-full bg-base-300 rounded-lg cursor-not-allowed"
            />

            {/* User Name (Read-only) */}
            <label className="label text-secondary mt-3">User Name</label>
            <input
              type="text"
              name="userName"
              value={user?.name || user?.displayName || ""}
              readOnly
              className="input mb-4 h-[53px] w-full bg-base-300 rounded-lg cursor-not-allowed"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-neutral mt-4 py-6 w-full btn-hover"
            >
              Add Transaction
            </button>
          </div>

        </fieldset>
      </form>
    </section>
  );
}

export default AddTransaction;
