import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Calendar, Percent } from 'lucide-react';

const LoanActivityContainer = styled(motion.div)`
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

const LoanDetailsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
`;

const LoanDetailCard = styled(motion.div)`
  background-color: #f0f4f8;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  align-items: center;
`;

const LoanDetailIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #4CAF50;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;

const LoanDetailContent = styled.div`
  flex: 1;
`;

const LoanDetailLabel = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
`;

const LoanDetailValue = styled.p`
  margin: 5px 0 0 0;
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const ToggleButton = styled.button`
  background-color: #f0f4f8;
  border: none;
  border-radius: 20px;
  padding: 5px 15px;
  margin-right: 10px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e8eef3;
  }

  &.active {
    background-color: #4CAF50;
    color: white;
  }
`;

const loanData = [
  { month: 'Jan', invested: 100000, borrowed: 50000 },
  { month: 'Feb', invested: 150000, borrowed: 50000 },
  { month: 'Mar', invested: 120000, borrowed: 75000 },
  { month: 'Apr', invested: 180000, borrowed: 75000 },
  { month: 'May', invested: 200000, borrowed: 100000 },
  { month: 'Jun', invested: 250000, borrowed: 100000 },
];

const LoanActivity = () => {
  const [activeChart, setActiveChart] = useState('invested');

  const totalInvested = loanData.reduce((sum, data) => sum + data.invested, 0);
  const totalBorrowed = loanData.reduce((sum, data) => sum + data.borrowed, 0);
  const averageInterestRate = 9.5; // This should be calculated based on actual loan data
  const activeLoansTerm = 12; // This should be fetched from actual loan data

  return (
    <LoanActivityContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>
        <TrendingUp size={24} style={{ marginRight: '10px' }} />
        Loan Activity
      </Title>
      
      <div>
        <ToggleButton 
          className={activeChart === 'invested' ? 'active' : ''}
          onClick={() => setActiveChart('invested')}
        >
          Invested
        </ToggleButton>
        <ToggleButton 
          className={activeChart === 'borrowed' ? 'active' : ''}
          onClick={() => setActiveChart('borrowed')}
        >
          Borrowed
        </ToggleButton>
      </div>

      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={loanData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {activeChart === 'invested' && (
              <Line 
              type="monotone" 
              dataKey="invested" 
              stroke="#4CAF50" 
              activeDot={{ r: 8 }}
            />
          )}
          {activeChart === 'borrowed' && (
            <Line 
              type="monotone" 
              dataKey="borrowed" 
              stroke="#2196F3" 
              activeDot={{ r: 8 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>

    <LoanDetailsContainer>
      <LoanDetailCard
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <LoanDetailIcon>
          <DollarSign size={20} color="#ffffff" />
        </LoanDetailIcon>
        <LoanDetailContent>
          <LoanDetailLabel>Total Invested</LoanDetailLabel>
          <LoanDetailValue>KES {totalInvested.toLocaleString()}</LoanDetailValue>
        </LoanDetailContent>
      </LoanDetailCard>

      <LoanDetailCard
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <LoanDetailIcon>
          <DollarSign size={20} color="#ffffff" />
        </LoanDetailIcon>
        <LoanDetailContent>
          <LoanDetailLabel>Total Borrowed</LoanDetailLabel>
          <LoanDetailValue>KES {totalBorrowed.toLocaleString()}</LoanDetailValue>
        </LoanDetailContent>
      </LoanDetailCard>

      <LoanDetailCard
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <LoanDetailIcon>
          <Percent size={20} color="#ffffff" />
        </LoanDetailIcon>
        <LoanDetailContent>
          <LoanDetailLabel>Average Interest Rate</LoanDetailLabel>
          <LoanDetailValue>{averageInterestRate}%</LoanDetailValue>
        </LoanDetailContent>
      </LoanDetailCard>

      <LoanDetailCard
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <LoanDetailIcon>
          <Calendar size={20} color="#ffffff" />
        </LoanDetailIcon>
        <LoanDetailContent>
          <LoanDetailLabel>Active Loans Term</LoanDetailLabel>
          <LoanDetailValue>{activeLoansTerm} months</LoanDetailValue>
        </LoanDetailContent>
      </LoanDetailCard>
    </LoanDetailsContainer>
  </LoanActivityContainer>
);
};

export default LoanActivity;