import React from 'react';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import LoanCard from './LoanCard';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 24px;
`;

const LoanGrid = ({ loans, onViewDetails, onInvest }) => {
  return (
    <Grid>
      <AnimatePresence>
        {loans.map(loan => (
          <LoanCard
            key={loan.id}
            loan={loan}
            onViewDetails={onViewDetails}
            onInvest={onInvest}
          />
        ))}
      </AnimatePresence>
    </Grid>
  );
};

export default LoanGrid;