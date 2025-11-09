import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import axios from 'axios';

const MyTransactions = () => {
  const { user } = useContext(AuthContext)
  console.log(user);
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/my-transactions")
      .then(res => {
        setTransactions(res.data)
      })
      .catch(error => console.error(error))
  }, [])

  return (
    <section className='section-padding'>
      {
        transactions.map(transaction => (
          <tr key={transaction._id}>
            <td>{transaction.type}</td>
            <td>{transaction.category}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.description}</td>
            <td>{transaction.date}</td>
            <td>{transaction.userName}</td>
            <td>{transaction.userEmail}</td>
          </tr>
        ))
      }
    </section>
  );
};

export default MyTransactions;