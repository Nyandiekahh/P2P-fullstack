// src/components/QuickStats.js
import React from 'react';

const QuickStats = () => (
  <div className="card quick-stats">
    <h2>Quick Stats</h2>
    <div className="stats-grid">
      <div className="stat-item">
        <p className="stat-label">Total Invested</p>
        <p className="stat-value">KES 500,000</p>
      </div>
      <div className="stat-item">
        <p className="stat-label">Total Borrowed</p>
        <p className="stat-value">KES 200,000</p>
      </div>
      <div className="stat-item">
        <p className="stat-label">Active Investments</p>
        <p className="stat-value">12</p>
      </div>
      <div className="stat-item">
        <p className="stat-label">Avg. Return Rate</p>
        <p className="stat-value">9.5%</p>
      </div>
    </div>
  </div>
);

export default QuickStats;