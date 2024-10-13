// components/PortfolioDistribution.js
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const portfolioData = [
  { name: 'Loans', value: 60 },
  { name: 'M-Pesa Savings', value: 30 },
  { name: 'Investments', value: 10 },
];

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FED766'];

const PortfolioDistribution = () => (
  <div className="card portfolio-distribution">
    <h2>Portfolio Distribution</h2>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={portfolioData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {portfolioData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default PortfolioDistribution;