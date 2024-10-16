import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, DollarSign, Calendar, Percent, AlertTriangle } from 'lucide-react';

const LoanListingsContainer = styled(motion.div)`
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

const LoanList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const LoanItem = styled(motion.li)`
  background-color: #f0f4f8;
  border-radius: 8px;
  margin-bottom: 15px;
  overflow: hidden;
`;

const LoanHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  cursor: pointer;
`;

const LoanTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #333;
`;

const LoanAmount = styled.span`
  font-weight: bold;
  color: #4CAF50;
`;

const LoanDetails = styled(motion.div)`
  padding: 0 15px 15px;
`;

const LoanInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 15px;
`;

const LoanInfo = styled.div`
  display: flex;
  align-items: center;
`;

const LoanInfoIcon = styled.span`
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: #e0e0e0;
  border-radius: 50%;
`;

const LoanInfoLabel = styled.span`
  font-size: 14px;
  color: #666;
`;

const LoanInfoValue = styled.span`
  font-weight: bold;
  margin-left: 5px;
`;

const InvestButton = styled(motion.button)`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
`;

const loans = [
  { id: 1, title: 'Small Business Loan', amount: 50000, term: '6 months', interest: '8%', risk: 'Low' },
  { id: 2, title: 'Education Loan', amount: 100000, term: '12 months', interest: '10%', risk: 'Medium' },
  { id: 3, title: 'Home Improvement Loan', amount: 150000, term: '18 months', interest: '12%', risk: 'High' },
];

const LoanListings = () => {
  const [expandedLoan, setExpandedLoan] = useState(null);

  const toggleLoan = (id) => {
    setExpandedLoan(expandedLoan === id ? null : id);
  };

  const handleInvest = (id) => {
    // Implement invest logic here
    console.log(`Investing in loan ${id}`);
  };

  return (
    <LoanListingsContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>
        <DollarSign size={24} style={{ marginRight: '10px' }} />
        Available Loan Requests
      </Title>
      <LoanList>
        <AnimatePresence>
          {loans.map((loan) => (
            <LoanItem key={loan.id}>
              <LoanHeader onClick={() => toggleLoan(loan.id)}>
                <LoanTitle>{loan.title}</LoanTitle>
                <LoanAmount>KES {loan.amount.toLocaleString()}</LoanAmount>
                {expandedLoan === loan.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </LoanHeader>
              <AnimatePresence>
                {expandedLoan === loan.id && (
                  <LoanDetails
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <LoanInfoGrid>
                      <LoanInfo>
                        <LoanInfoIcon><Calendar size={18} /></LoanInfoIcon>
                        <LoanInfoLabel>Term:</LoanInfoLabel>
                        <LoanInfoValue>{loan.term}</LoanInfoValue>
                      </LoanInfo>
                      <LoanInfo>
                        <LoanInfoIcon><Percent size={18} /></LoanInfoIcon>
                        <LoanInfoLabel>Interest:</LoanInfoLabel>
                        <LoanInfoValue>{loan.interest}</LoanInfoValue>
                      </LoanInfo>
                      <LoanInfo>
                        <LoanInfoIcon><AlertTriangle size={18} /></LoanInfoIcon>
                        <LoanInfoLabel>Risk:</LoanInfoLabel>
                        <LoanInfoValue>{loan.risk}</LoanInfoValue>
                      </LoanInfo>
                    </LoanInfoGrid>
                    <InvestButton
                      onClick={() => handleInvest(loan.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Invest Now
                    </InvestButton>
                  </LoanDetails>
                )}
              </AnimatePresence>
            </LoanItem>
          ))}
        </AnimatePresence>
      </LoanList>
    </LoanListingsContainer>
  );
};

export default LoanListings;