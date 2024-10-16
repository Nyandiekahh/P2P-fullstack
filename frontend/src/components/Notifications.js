import React, { useState } from 'react';
import styled from 'styled-components';
import { AlertCircle, CreditCard } from 'lucide-react';
import PaymentForm from './PaymentForm';

const NotificationCard = styled.div`
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
`;

const Title = styled.h2`
  margin-bottom: 15px;
`;

const Alert = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background: #fff;
  border-radius: 4px;
`;

const AlertIcon = styled(AlertCircle)`
  margin-right: 10px;
  color: #ffa500;
`;

const MpesaInvestment = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: #e6f7ff;
  border-radius: 4px;
`;

const MpesaButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;

  &:hover {
    background: #45a049;
  }
`;

const MpesaIcon = styled(CreditCard)`
  margin-right: 10px;
`;

const Notifications = () => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handleMPesaInvestment = () => {
    setShowPaymentForm(true);
  };

  return (
    <NotificationCard>
      <Title>Notifications</Title>
      <Alert>
        <AlertIcon />
        <p>New loan request matching your criteria</p>
      </Alert>
      <Alert>
        <AlertIcon />
        <p>M-Pesa payment due in 3 days</p>
      </Alert>
      
      <MpesaInvestment>
        <h3>Invest in P2P Loans</h3>
        <p>Grow your portfolio by investing through M-PESA</p>
        <MpesaButton onClick={handleMPesaInvestment}>
          <MpesaIcon />
          Invest via M-PESA
        </MpesaButton>
      </MpesaInvestment>

      {showPaymentForm && <PaymentForm />}
    </NotificationCard>
  );
};

export default Notifications;