// src/components/InvestmentPortfolio.js
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const InvestmentPortfolio = () => {
  const portfolioData = [
    { name: 'Low Risk', value: 50 },
    { name: 'Medium Risk', value: 30 },
    { name: 'High Risk', value: 20 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="card investment-portfolio">
      <h2>Investment Portfolio</h2>
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
      <div className="portfolio-summary">
        <p>Total Invested: KES 500,000</p>
        <p>Average Return: 9.5%</p>
      </div>
    </div>
  );
};

export default InvestmentPortfolio;