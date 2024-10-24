import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background-color: #43b02a;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
  }
`;

const Message = styled.p`
  margin-top: 15px;
  padding: 10px;
  border-radius: 4px;
  background-color: ${props => props.isError ? '#ffebee' : '#e8f5e9'};
  color: ${props => props.isError ? '#c62828' : '#2e7d32'};
`;

const PhoneOption = styled.button`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const ResponseDetails = styled.pre`
  margin-top: 15px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-size: 12px;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

function PaymentForm({ userPhoneNumber }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);

  useEffect(() => {
    if (userPhoneNumber) {
      setPhoneNumber(userPhoneNumber);
    }
  }, [userPhoneNumber]);

  const getAuthToken = () => {
    try {
      // Get tokens from localStorage
      const tokensStr = localStorage.getItem('tokens');
      if (tokensStr) {
        const tokens = JSON.parse(tokensStr);
        if (tokens.access) {
          return tokens.access;
        }
      }
      
      // Fallback to single token if exists
      return localStorage.getItem('token');
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);
    setTransactionDetails(null);

    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('Please log in to make a payment');
      }

      // Format phone number if needed
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

    } catch (error) {
      console.error('Payment error:', error);
      setIsError(true);
      if (error.message === 'Please log in to make a payment') {
        setMessage(error.message);
      } else if (error.response) {
        const errorMessage = error.response.data.error || 
                           error.response.data.detail || 
                           error.response.data.message || 
                           'An error occurred';
        setMessage(`Error: ${errorMessage}`);
      } else if (error.request) {
        setMessage('No response received from server. Please try again.');
      } else {
        setMessage('An error occurred while setting up the request. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUseUserPhone = () => {
    setPhoneNumber(userPhoneNumber);
  };

  const formatTransactionDetails = (details) => {
    if (!details) return null;
    
    const relevantInfo = {
      'Message': details.message,
      'Transaction ID': details.transaction_id,
      'Merchant Request ID': details.merchant_request_id,
      'Customer Message': details.customer_message
    };

    return JSON.stringify(relevantInfo, null, 2);
  };

  return (
    <FormContainer>
      <Title>Make a Payment</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="phoneNumber">Phone Number:</Label>
          {userPhoneNumber && userPhoneNumber !== phoneNumber && (
            <PhoneOption type="button" onClick={handleUseUserPhone}>
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
      {transactionDetails && (
        <ResponseDetails>
          {formatTransactionDetails(transactionDetails)}
        </ResponseDetails>
      )}
    </FormContainer>
  );
}

export default PaymentForm;