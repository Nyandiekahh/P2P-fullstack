// src/components/LoanMarketplace/components/LoanDetailModal.js
import React, { useState } from 'react';
import styled from 'styled-components';
import {
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
  CloseButton,
} from '../styles/components'; // Ensure these components exist in your styles folder

// Styled SubmitButton component
const SubmitButton = styled.button`
  background-color: #4caf50; /* Green */
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049; /* Darker green */
  }
`;

const LoanDetailModal = ({ isOpen, onClose }) => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [interest, setInterest] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);

  const calculateLoanDetails = () => {
    const principalNum = parseFloat(principal);
    const rateNum = parseFloat(rate);
    const timeNum = parseFloat(time);
    
    if (isNaN(principalNum) || isNaN(rateNum) || isNaN(timeNum)) {
      alert('Please enter valid numbers for principal, rate, and time.');
      return;
    }
    
    const calculatedInterest = (principalNum * rateNum * timeNum) / 100;
    const total = principalNum + calculatedInterest;
    
    setInterest(calculatedInterest);
    setTotalAmount(total);
  };

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Loan Details</ModalTitle>
          <CloseButton onClick={onClose}>X</CloseButton>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={(e) => { e.preventDefault(); calculateLoanDetails(); }}>
            <div>
              <label>
                Principal Amount:
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Interest Rate (%):
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Time (Years):
                <input
                  type="number"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </label>
            </div>
            <SubmitButton type="submit">Calculate</SubmitButton>
          </form>
          {interest !== null && totalAmount !== null && (
            <div>
              <h4>Calculation Results</h4>
              <p>Interest: {interest.toFixed(2)}</p>
              <p>Total Amount to be Paid Back: {totalAmount.toFixed(2)}</p>
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LoanDetailModal;
