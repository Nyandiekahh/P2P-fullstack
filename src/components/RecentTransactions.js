// components/RecentTransactions.js
import React from 'react';

const RecentTransactions = () => (
  <div className="card recent-transactions">
    <h2>Recent Transactions</h2>
    <ul>
      <li>
        <span>M-Pesa loan payment received</span>
        <span className="amount positive">+KES 25,000</span>
      </li>
      <li>
        <span>New loan issued</span>
        <span className="amount negative">-KES 100,000</span>
      </li>
      <li>
        <span>Interest earned</span>
        <span className="amount positive">+KES 5,000</span>
      </li>
    </ul>
  </div>
);

export default RecentTransactions;