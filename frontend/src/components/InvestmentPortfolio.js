import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Briefcase, TrendingUp, AlertCircle, DollarSign } from 'lucide-react';

const PortfolioContainer = styled(motion.div)`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  color: #333;
`;

const ChartContainer = styled.div`
  height: 300px;
  margin-bottom: 20px;
`;

const PortfolioSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
`;

const SummaryCard = styled(motion.div)`
  background-color: #f0f4f8;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  align-items: center;
`;

const SummaryIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #4CAF50;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;

const SummaryContent = styled.div`
  flex: 1;
`;

const SummaryLabel = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
`;

const SummaryValue = styled.p`
  margin: 5px 0 0 0;
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const CustomTooltip = styled.div`
  background-color: #ffffff;
  border: 1px solid #f0f0f0;
  padding: 10px;
  border-radius: 4px;
`;

const portfolioData = [
  { name: 'Low Risk', value: 50, color: '#4CAF50' },
  { name: 'Medium Risk', value: 30, color: '#FFA000' },
  { name: 'High Risk', value: 20, color: '#F44336' },
];

const InvestmentPortfolio = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const totalInvested = 500000; // This should be calculated from actual investment data
  const averageReturn = 9.5; // This should be calculated from actual investment data
  const activeInvestments = 12; // This should be fetched from actual investment data
  const projectedEarnings = 47500; // This should be calculated based on investments and returns

  const renderCustomTooltip = ({ payload }) => {
    if (payload && payload.length) {
      const data = payload[0].payload;
      return (
        <CustomTooltip>
          <p><strong>{data.name}</strong></p>
          <p>Value: KES {data.value.toLocaleString()}</p>
          <p>Percentage: {((data.value / totalInvested) * 100).toFixed(2)}%</p>
        </CustomTooltip>
      );
    }
    return null;
  };

  return (
    <PortfolioContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>
        <Briefcase size={24} style={{ marginRight: '10px' }} />
        Investment Portfolio
      </Title>
      
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={portfolioData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              onMouseEnter={onPieEnter}
            >
              {portfolioData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke={index === activeIndex ? '#fff' : 'none'}
                  strokeWidth={index === activeIndex ? 2 : 0}
                />
              ))}
            </Pie>
            <Tooltip content={renderCustomTooltip} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>

      <PortfolioSummary>
        <SummaryCard
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <SummaryIcon>
            <DollarSign size={20} color="#ffffff" />
          </SummaryIcon>
          <SummaryContent>
            <SummaryLabel>Total Invested</SummaryLabel>
            <SummaryValue>KES {totalInvested.toLocaleString()}</SummaryValue>
          </SummaryContent>
        </SummaryCard>

        <SummaryCard
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <SummaryIcon>
            <TrendingUp size={20} color="#ffffff" />
          </SummaryIcon>
          <SummaryContent>
            <SummaryLabel>Average Return</SummaryLabel>
            <SummaryValue>{averageReturn}%</SummaryValue>
          </SummaryContent>
        </SummaryCard>

        <SummaryCard
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <SummaryIcon>
            <Briefcase size={20} color="#ffffff" />
          </SummaryIcon>
          <SummaryContent>
            <SummaryLabel>Active Investments</SummaryLabel>
            <SummaryValue>{activeInvestments}</SummaryValue>
          </SummaryContent>
        </SummaryCard>

        <SummaryCard
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <SummaryIcon>
            <AlertCircle size={20} color="#ffffff" />
          </SummaryIcon>
          <SummaryContent>
            <SummaryLabel>Projected Earnings</SummaryLabel>
            <SummaryValue>KES {projectedEarnings.toLocaleString()}</SummaryValue>
          </SummaryContent>
        </SummaryCard>
      </PortfolioSummary>
    </PortfolioContainer>
  );
};

export default InvestmentPortfolio;