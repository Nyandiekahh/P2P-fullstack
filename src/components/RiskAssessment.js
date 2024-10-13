// components/RiskAssessment.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const riskData = [
  { category: 'Low', value: 30 },
  { category: 'Medium', value: 50 },
  { category: 'High', value: 20 },
];

const RiskAssessment = () => (
  <div className="card risk-assessment">
    <h2>Risk Assessment</h2>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={riskData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#4ECDC4" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default RiskAssessment;