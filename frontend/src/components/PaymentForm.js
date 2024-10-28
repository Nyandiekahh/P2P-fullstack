import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FormContainer = styled.div`
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.3s ease-out;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid ${props => props.isError ? '#ff5252' : '#e0e0e0'};
  border-radius: 6px;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #43b02a;
    box-shadow: 0 0 0 2px rgba(67, 176, 42, 0.1);
  }

  &::placeholder {
    color: #aaa;
  }
`;

const SubmitButton = styled.button`
  background-color: #43b02a;
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background-color: #3a9824;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
  }
`;

const Message = styled.div`
  margin-top: 20px;
  padding: 12px 16px;
  border-radius: 6px;
  background-color: ${props => props.isError ? '#ffebee' : '#e8f5e9'};
  color: ${props => props.isError ? '#c62828' : '#2e7d32'};
  animation: ${fadeIn} 0.3s ease-out;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '${props => props.isError ? '⚠️' : '✅'}';
  }
`;

const PhoneOption = styled.button`
  background-color: #f8f9fa;
  border: 2px solid #e0e0e0;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: all 0.3s ease;
  color: #555;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #f0f0f0;
    border-color: #43b02a;
  }

  &::before {
    content: '📱';
  }
`;

const TransactionDetails = styled.div`
  margin-top: 20px;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 2px solid #e0e0e0;
  animation: ${fadeIn} 0.3s ease-out;
`;

const DetailItem = styled.div`
  margin-bottom: 8px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  color: #666;
  font-weight: 500;
`;

const DetailValue = styled.span`
  color: #333;
  font-weight: 400;
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  background-color: ${props => {
    switch (props.status) {
      case 'COMPLETED': return '#e8f5e9';
      case 'FAILED': return '#ffebee';
      default: return '#fff3e0';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'COMPLETED': return '#2e7d32';
      case 'FAILED': return '#c62828';
      default: return '#ef6c00';
    }
  }};
`;

function PaymentForm({ userPhoneNumber }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [pollingInterval, setPollingInterval] = useState(null);

  useEffect(() => {
    if (userPhoneNumber) {
      setPhoneNumber(userPhoneNumber);
    }
  }, [userPhoneNumber]);

  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

  const getAuthToken = () => {
    try {
      const tokensStr = localStorage.getItem('tokens');
      if (tokensStr) {
        const tokens = JSON.parse(tokensStr);
        if (tokens.access) {
          return tokens.access;
        }
      }
      return localStorage.getItem('token');
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  };

  const checkPaymentStatus = async (transactionId) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(
        `http://localhost:8000/api/transactions/check_payment_status/${transactionId}/`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      const status = response.data.status;
      setPaymentStatus(status);
      
      if (status === 'COMPLETED') {
        setMessage('Payment completed successfully!');
        setIsError(false);
        return true;
      } else if (status === 'FAILED') {
        setMessage(`Payment failed: ${response.data.message}`);
        setIsError(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error checking payment status:', error);
      setMessage('Error checking payment status');
      setIsError(true);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);
    setTransactionDetails(null);
    setPaymentStatus(null);

    if (pollingInterval) {
      clearInterval(pollingInterval);
      setPollingInterval(null);
    }

    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('Please log in to make a payment');
      }

      const formattedPhone = phoneNumber.startsWith('254') 
        ? phoneNumber 
        : `254${phoneNumber.replace(/^0+/, '')}`;

      const response = await axios.post(
        'http://localhost:8000/api/transactions/initiate_mpesa_payment/',
        {
          phone_number: formattedPhone,
          amount: amount
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setMessage('Payment initiated. Please check your phone for the STK push.');
      setIsError(false);
      setTransactionDetails(response.data);

      if (response.data.transaction_id) {
        const interval = setInterval(async () => {
          const isDone = await checkPaymentStatus(response.data.transaction_id);
          if (isDone) {
            clearInterval(interval);
            setPollingInterval(null);
          }
        }, 5000);

        setPollingInterval(interval);

        setTimeout(() => {
          clearInterval(interval);
          setPollingInterval(null);
          if (paymentStatus !== 'COMPLETED' && paymentStatus !== 'FAILED') {
            setMessage('Payment status check timed out. Please check your M-Pesa messages.');
            setIsError(true);
          }
        }, 120000);
      }

    } catch (error) {
      console.error('Payment error:', error);
      setIsError(true);
      setMessage(error.response?.data?.error || error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <Title>Make a Payment</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="phoneNumber">Phone Number:</Label>
          {userPhoneNumber && userPhoneNumber !== phoneNumber && (
            <PhoneOption type="button" onClick={() => setPhoneNumber(userPhoneNumber)}>
              Use my number: {userPhoneNumber}
            </PhoneOption>
          )}
          <Input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="e.g., 254712345678"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="amount">Amount (KES):</Label>
          <Input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </FormGroup>

        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Pay with M-PESA'}
        </SubmitButton>
      </form>

      {message && <Message isError={isError}>{message}</Message>}

      {paymentStatus && (
        <TransactionDetails>
          <DetailItem>
            <DetailLabel>Payment Status:</DetailLabel>
            <StatusBadge status={paymentStatus}>{paymentStatus}</StatusBadge>
          </DetailItem>
        </TransactionDetails>
      )}

      {transactionDetails && (
        <TransactionDetails>
          <DetailItem>
            <DetailLabel>Transaction ID:</DetailLabel>
            <DetailValue>{transactionDetails.transaction_id}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Merchant Request ID:</DetailLabel>
            <DetailValue>{transactionDetails.merchant_request_id}</DetailValue>
          </DetailItem>
          {transactionDetails.customer_message && (
            <DetailItem>
              <DetailLabel>Message:</DetailLabel>
              <DetailValue>{transactionDetails.customer_message}</DetailValue>
            </DetailItem>
          )}
        </TransactionDetails>
      )}
    </FormContainer>
  );
}

export default PaymentForm;