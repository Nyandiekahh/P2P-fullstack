// src/components/LoanActivity.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const loanData = [
  { month: 'Jan', invested: 100000, borrowed: 50000 },
  { month: 'Feb', invested: 150000, borrowed: 50000 },
  { month: 'Mar', invested: 120000, borrowed: 75000 },
  { month: 'Apr', invested: 180000, borrowed: 75000 },
  { month: 'May', invested: 200000, borrowed: 100000 },
  { month: 'Jun', invested: 250000, borrowed: 100000 },
];

const LoanActivity = () => (
  <div className="card loan-activity">
    <h2>Loan Activity (KES)</h2>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={loanData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="invested" name="Invested" stroke="#8884d8" strokeWidth={2} />
        <Line type="monotone" dataKey="borrowed" name="Borrowed" stroke="#82ca9d" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default LoanActivity;