import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  text-align: left;
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

function PaymentForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);
    try {
      console.log('Initiating payment request...');
      const response = await axios.post('http://localhost:5000/api/initiate-payment', { phoneNumber, amount });
      console.log('Payment response:', response.data);
      setMessage('Payment initiated. Please check your phone for the STK push.');
      setIsError(false);
    } catch (error) {
      console.error('Payment error:', error);
      setIsError(true);
      if (error.response) {
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
        setMessage(`Error: ${error.response.data.error || 'An error occurred'}`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        setMessage('No response received from server. Please try again.');
      } else {
        console.error('Error message:', error.message);
        setMessage('An error occurred while setting up the request. Please try again.');
      }
    }
    setLoading(false);
  };

  return (
    <FormContainer>
      <Title>Make a Payment</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="phoneNumber">Phone Number:</Label>
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
    </FormContainer>
  );
}

export default PaymentForm;