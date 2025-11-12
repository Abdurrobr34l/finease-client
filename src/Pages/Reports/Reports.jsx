import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { PieChart, Pie, Cell, Tooltip, BarChart, XAxis, YAxis, Bar, ResponsiveContainer, Legend } from "recharts";

const Reports = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/my-transactions")
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => console.log("Error fetching transactions:", err));
  }, [])


  const categoryData = [];

  transactions.forEach(item => {
    const allCategory = item.category || "Other";
    const amount = Number(item.amount) || 0;

    const found = categoryData.find(findCategory => findCategory.name === allCategory);
    if (found) {
      found.value += amount;
    } else {
      categoryData.push({ name: allCategory, value: amount });
    }
  });

  const monthData = [];

  transactions.forEach(item => {
    const date = new Date(item.date);
    if (isNaN(date)) return;

    const monthName = date.toLocaleString("default", { month: "short" });
    const amount = Number(item.amount) || 0;

    const found = monthData.find(month => month.name === monthName);
    if (found) found.total += amount;
    else monthData.push({ name: monthName, total: amount });
  });

  if (!transactions || transactions.length === 0) {
    return (
      <section className="section-padding">
        <div className="max-w-2xl mx-auto text-center p-8 bg-base-100 rounded-lg shadow">
          <h3 className="text-2xl font-bold mb-3">No Reports Available</h3>
          <p className="text-secondary mb-6">
            There are no reports to display yet. Add your first transaction to see insights here.
          </p>
          <Link to="/add-transactions" className="btn btn-hover">
            Add Transaction
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className='flex flex-col gap-24'>
      {/* Pie Chart */}
      <ResponsiveContainer width="100%" height={500}>
        <PieChart>
          <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={100} label />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={monthData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" />
        </BarChart>
      </ResponsiveContainer>

    </section>
  );
};

export default Reports;