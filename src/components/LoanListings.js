// src/components/LoanListings.js
import React from 'react';
import { Link } from 'react-router-dom';

const LoanListings = () => {
  const loans = [
    { id: 1, amount: 5000, term: '6 months', interest: '8%', risk: 'Low' },
    { id: 2, amount: 10000, term: '12 months', interest: '10%', risk: 'Medium' },
    { id: 3, amount: 15000, term: '18 months', interest: '12%', risk: 'High' },
  ];

  return (
    <div className="card loan-listings">
      <h2>Available Loan Requests</h2>
      <ul>
        {loans.map((loan) => (
          <li key={loan.id}>
            <Link to={`/loan/${loan.id}`}>
              KES {loan.amount} - {loan.term} - {loan.interest} interest - {loan.risk} risk
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/request-loan" className="button">Request a Loan</Link>
    </div>
  );
};

export default LoanListings;