import React, { useState } from 'react';
import UserProfile from './UserProfile';
import QuickStats from './QuickStats';
import Notifications from './Notifications';
import LoanActivity from './LoanActivity';
import LoanListings from './LoanListings';
import InvestmentPortfolio from './InvestmentPortfolio';
import TransactionHistory from './TransactionHistory';
import CurrencyConverter from './CurrencyConverter';
import './Dashboard.css';

const Dashboard = () => {
  const [userPhoneNumber, setUserPhoneNumber] = useState('');

  const handleUserDataFetched = (phoneNumber) => {
    setUserPhoneNumber(phoneNumber);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>P2P Lending Dashboard</h1>
      </header>
      <div className="dashboard-content">
        <div className="dashboard-row">
          <UserProfile onUserDataFetched={handleUserDataFetched} />
          <QuickStats />
          <Notifications userPhoneNumber={userPhoneNumber} />
        </div>
        <div className="dashboard-row">
          <LoanActivity />
          <InvestmentPortfolio />
        </div>
        <div className="dashboard-row">
          <LoanListings />
          <TransactionHistory />
        </div>
        <div className="dashboard-row">
          <CurrencyConverter />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;