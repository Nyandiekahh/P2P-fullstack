import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  RefreshCw,
  HelpCircle
} from 'lucide-react';
import ClassicClock from './ClassicClock';
import UserProfile from './UserProfile';
import QuickStats from './QuickStats';
import Notifications from './Notifications';
import LoanActivity from './LoanActivity';
import LoanMarketplace from './LoanMarketplace';
import VideoTutorial from './VideoTutorial';
import TransactionHistory from './TransactionHistory';
import CurrencyConverter from './CurrencyConverter';
import EducationalResources from './EducationalResources';
import TutorialComponent from './TutorialComponent';

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
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 40px;
  width: auto;
`;

const RefreshButton = styled(motion.button)`
  display: flex;
  align-items: center;
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
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

const VideoTutorialSection = styled(Section)`
  grid-column: span 6;
`;

const LoanMarketplaceSection = styled(Section)`
  grid-column: span 8;
  max-height: 800px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
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

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ClockWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const Dashboard = () => {
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  const handleUserDataFetched = (phoneNumber) => {
    setUserPhoneNumber(phoneNumber);
  };

  const handleRefresh = async () => {
    try {
      console.log('Refreshing dashboard data...');
      // Add your refresh logic here
    } catch (error) {
      console.error('Error refreshing dashboard:', error);
    }
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
      <TutorialComponent />
      <Header>
        <HeaderContent>
          <LogoWrapper>
            <Logo src="/jengafunds-logo.svg" alt="JengaFunds Logo" />
          </LogoWrapper>
          <ClockWrapper>
            <ClassicClock />
          </ClockWrapper>
          <RefreshButton
            onClick={handleRefresh}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw size={16} style={{ marginRight: '6px' }} />
            Refresh
          </RefreshButton>
        </HeaderContent>
      </Header>

      <UserProfileSection
        className="user-profile"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <UserProfile onUserDataFetched={handleUserDataFetched} />
      </UserProfileSection>

      <QuickStatsSection
        className="quick-stats"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <QuickStats />
      </QuickStatsSection>

      <NotificationsSection
        className="notifications"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Notifications userPhoneNumber={userPhoneNumber} />
      </NotificationsSection>

      <LoanActivitySection
        className="loan-activity"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <LoanActivity />
      </LoanActivitySection>

      <VideoTutorialSection
        className="video-tutorial"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <VideoTutorial videoSrc="/p2p.mp4" />
      </VideoTutorialSection>

      <LoanMarketplaceSection
        className="loan-marketplace"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <LoanMarketplace />
      </LoanMarketplaceSection>

      <TransactionHistorySection
        className="transaction-history"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <TransactionHistory />
      </TransactionHistorySection>

      <CurrencyConverterSection
        className="currency-converter"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <CurrencyConverter />
      </CurrencyConverterSection>

      <EducationalResourcesSection
        className="educational-resources"
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
    </DashboardContainer>
  );
};

export default Dashboard;