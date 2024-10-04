import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { UserCircle, AlertCircle, RefreshCw } from 'lucide-react';
import './Dashboard.css';

const loanData = [
  { month: 'Jan', amount: 100000 },
  { month: 'Feb', amount: 150000 },
  { month: 'Mar', amount: 120000 },
  { month: 'Apr', amount: 180000 },
  { month: 'May', amount: 200000 },
  { month: 'Jun', amount: 250000 },
];

const portfolioData = [
  { name: 'Loans', value: 60 },
  { name: 'M-Pesa Savings', value: 30 },
  { name: 'Investments', value: 10 },
];

const riskData = [
  { category: 'Low', value: 30 },
  { category: 'Medium', value: 50 },
  { category: 'High', value: 20 },
];

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FED766'];

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Tech Titan Lending Dashboard</h1>
      </header>
      <div className="dashboard-content">
        <div className="dashboard-row">
          <UserProfile />
          <QuickStats />
          <Notifications />
        </div>
        <div className="dashboard-row">
          <LoanActivity />
          <PortfolioDistribution />
        </div>
        <div className="dashboard-row">
          <RiskAssessment />
          <RecentTransactions />
        </div>
        <div className="dashboard-row">
          <CurrencyConverter />
        </div>
      </div>
    </div>
  );
};

const UserProfile = () => (
  <div className="card user-profile">
    <h2>User Profile</h2>
    <div className="user-info">
      <UserCircle size={64} className="user-icon" />
      <div>
        <h3>John Kamau</h3>
        <p>Member since 2021</p>
      </div>
    </div>
    <div className="user-details">
      <p><strong>Email:</strong> john.kamau@example.com</p>
      <p><strong>Credit Score:</strong> 750</p>
      <p><strong>ID Number:</strong> 12345678</p>
    </div>
  </div>
);

const QuickStats = () => (
  <div className="card quick-stats">
    <h2>Quick Stats</h2>
    <div className="stats-grid">
      <div className="stat-item">
        <p className="stat-label">Total Lent</p>
        <p className="stat-value">KES 1,500,000</p>
      </div>
      <div className="stat-item">
        <p className="stat-label">Total Borrowed</p>
        <p className="stat-value">KES 500,000</p>
      </div>
      <div className="stat-item">
        <p className="stat-label">Active Loans</p>
        <p className="stat-value">7</p>
      </div>
      <div className="stat-item">
        <p className="stat-label">Avg. Interest Rate</p>
        <p className="stat-value">12.5%</p>
      </div>
    </div>
  </div>
);

const Notifications = () => (
  <div className="card notifications">
    <h2>Notifications</h2>
    <div className="alert">
      <AlertCircle className="alert-icon" />
      <p>New loan request matching your criteria</p>
    </div>
    <div className="alert">
      <AlertCircle className="alert-icon" />
      <p>M-Pesa payment due in 3 days</p>
    </div>
  </div>
);

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
        <Line type="monotone" dataKey="amount" stroke="#FF6B6B" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

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

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('KES');
  const [toCurrency, setToCurrency] = useState('USD');
  const [result, setResult] = useState('');

  const handleConvert = () => {
    // This is a mock conversion. In a real application, you would use an API to get current exchange rates.
    const rates = {
      KES: { USD: 0.0074, EUR: 0.0068, GBP: 0.0058 },
      USD: { KES: 135.5, EUR: 0.92, GBP: 0.79 },
      EUR: { KES: 147.3, USD: 1.09, GBP: 0.86 },
      GBP: { KES: 171.3, USD: 1.26, EUR: 1.16 }
    };

    if (fromCurrency === toCurrency) {
      setResult(amount);
    } else {
      const convertedAmount = (amount * rates[fromCurrency][toCurrency]).toFixed(2);
      setResult(convertedAmount);
    }
  };

  return (
    <div className="card currency-converter">
      <h2>Currency Converter</h2>
      <div className="converter-content">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="converter-input"
        />
        <div className="converter-selects">
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="converter-select"
          >
            <option value="KES">KES</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="converter-select"
          >
            <option value="KES">KES</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
        <button onClick={handleConvert} className="converter-button">
          <RefreshCw className="converter-icon" /> Convert
        </button>
        {result && (
          <div className="converter-result">
            <p>
              {amount} {fromCurrency} = {result} {toCurrency}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;