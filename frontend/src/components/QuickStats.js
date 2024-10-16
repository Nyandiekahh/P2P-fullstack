import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Users, Percent } from 'lucide-react';

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const StatCard = styled(motion.div)`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

const StatLabel = styled.h3`
  font-size: 16px;
  color: #666;
  margin: 0 0 5px 0;
`;

const StatValue = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const StatChange = styled.span`
  font-size: 14px;
  color: ${props => props.positive ? '#4CAF50' : '#F44336'};
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const QuickStats = () => {
  const stats = [
    { label: 'Total Invested', value: 'KES 500,000', icon: DollarSign, color: '#4CAF50', change: '+5.2%' },
    { label: 'Total Borrowed', value: 'KES 200,000', icon: TrendingUp, color: '#2196F3', change: '-2.1%' },
    { label: 'Active Investments', value: '12', icon: Users, color: '#FFA000', change: '+1' },
    { label: 'Avg. Return Rate', value: '9.5%', icon: Percent, color: '#9C27B0', change: '+0.3%' }
  ];

  return (
    <StatsContainer>
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <StatIcon color={stat.color}>
            <stat.icon size={24} color="#ffffff" />
          </StatIcon>
          <StatLabel>{stat.label}</StatLabel>
          <StatValue>{stat.value}</StatValue>
          <StatChange positive={stat.change.startsWith('+')}>
            {stat.change.startsWith('+') ? '▲' : '▼'} {stat.change}
          </StatChange>
        </StatCard>
      ))}
    </StatsContainer>
  );
};

export default QuickStats;