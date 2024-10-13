// src/components/TransactionHistory.js
import React from 'react';

const TransactionHistory = () => {
  const transactions = [
    { id: 1, type: 'Investment', amount: 10000, date: '2023-06-01' },
    { id: 2, type: 'Loan Repayment', amount: -5000, date: '2023-06-05' },
    { id: 3, type: 'Interest Received', amount: 500, date: '2023-06-10' },
  ];

  return (
    <div className="card transaction-history">
      <h2>Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.type}</td>
              <td className={transaction.amount > 0 ? 'positive' : 'negative'}>
                KES {Math.abs(transaction.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;