import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  RefreshCw,
  HelpCircle
} from 'lucide-react';
import UserProfile from './UserProfile';
import QuickStats from './QuickStats';
import Notifications from './Notifications';
import LoanActivity from './LoanActivity';
import LoanListings from './LoanListings';
import InvestmentPortfolio from './InvestmentPortfolio';
import TransactionHistory from './TransactionHistory';
import CurrencyConverter from './CurrencyConverter';
import EducationalResources from './EducationalResources';


const DashboardContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
  padding: 20px;
  background-color: #f0f4f8;
  min-height: 100vh;
`;

const Header = styled.header`
  grid-column: span 12;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin: 0;
`;

const RefreshButton = styled(motion.button)`
  display: flex;
  align-items: center;
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const Section = styled(motion.section)`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const UserProfileSection = styled(Section)`
  grid-column: span 3;
`;

const QuickStatsSection = styled(Section)`
  grid-column: span 5;
`;

const NotificationsSection = styled(Section)`
  grid-column: span 4;
`;

const LoanActivitySection = styled(Section)`
  grid-column: span 6;
`;

const InvestmentPortfolioSection = styled(Section)`
  grid-column: span 6;
`;

const LoanListingsSection = styled(Section)`
  grid-column: span 8;
`;

const TransactionHistorySection = styled(Section)`
  grid-column: span 4;
`;

const CurrencyConverterSection = styled(Section)`
  grid-column: span 6;
`;

const EducationalResourcesSection = styled(Section)`
  grid-column: span 6;
`;

const HelpButton = styled(motion.button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Dashboard = () => {
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  const handleUserDataFetched = (phoneNumber) => {
    setUserPhoneNumber(phoneNumber);
  };

  const handleRefresh = () => {
    // Implement refresh logic here
    console.log('Refreshing dashboard data...');
  };

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  return (
    <DashboardContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header>
        <Title>P2P Lending Dashboard</Title>
        <RefreshButton
          onClick={handleRefresh}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw size={18} style={{ marginRight: '8px' }} />
          Refresh Data
        </RefreshButton>
      </Header>

      <UserProfileSection
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <UserProfile onUserDataFetched={handleUserDataFetched} />
      </UserProfileSection>

      <QuickStatsSection
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <QuickStats />
      </QuickStatsSection>

      <NotificationsSection
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Notifications userPhoneNumber={userPhoneNumber} />
      </NotificationsSection>

      <LoanActivitySection
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <LoanActivity />
      </LoanActivitySection>

      <InvestmentPortfolioSection
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <InvestmentPortfolio />
      </InvestmentPortfolioSection>

      <LoanListingsSection
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <LoanListings />
      </LoanListingsSection>

      <TransactionHistorySection
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <TransactionHistory />
      </TransactionHistorySection>

      <CurrencyConverterSection
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <CurrencyConverter />
      </CurrencyConverterSection>

      <EducationalResourcesSection
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <EducationalResources />
      </EducationalResourcesSection>

      <HelpButton
        onClick={toggleHelp}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <HelpCircle size={24} />
      </HelpButton>

      {/* {showHelp && (
        <HelpOverlay onClose={toggleHelp} />
      )} */}
    </DashboardContainer>
  );
};

export default Dashboard;