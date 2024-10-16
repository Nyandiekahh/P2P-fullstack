import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { RefreshCw, ArrowRightCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ConverterContainer = styled(motion.div)`
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

const ConverterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  background-color: #f0f4f8;
`;

const ConvertButton = styled(motion.button)`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Result = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
`;

const ChartContainer = styled.div`
  height: 300px;
  margin-top: 30px;
`;

const ChartTitle = styled.h3`
  margin-bottom: 15px;
  color: #333;
`;

// Mock exchange rates (replace with real API data in production)
const exchangeRates = {
  USD: 1,
  EUR: 0.84,
  GBP: 0.72,
  JPY: 110.14,
  KES: 107.25,
};

// Mock historical data (replace with real API data in production)
const historicalData = [
  { date: '2023-01-01', rate: 105.50 },
  { date: '2023-02-01', rate: 106.20 },
  { date: '2023-03-01', rate: 106.80 },
  { date: '2023-04-01', rate: 107.10 },
  { date: '2023-05-01', rate: 107.25 },
];

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('KES');
  const [result, setResult] = useState(null);

  const handleConvert = (e) => {
    e.preventDefault();
    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
    const convertedAmount = (amount / fromRate) * toRate;
    setResult(convertedAmount.toFixed(2));
  };

  return (
    <ConverterContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>
        <RefreshCw size={24} style={{ marginRight: '10px' }} />
        Currency Converter
      </Title>

      <ConverterForm onSubmit={handleConvert}>
        <InputGroup>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
          <Select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
            {Object.keys(exchangeRates).map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </Select>
        </InputGroup>
        <InputGroup>
          <ArrowRightCircle size={24} />
          <Select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
            {Object.keys(exchangeRates).map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </Select>
        </InputGroup>
        <ConvertButton
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Convert
        </ConvertButton>
      </ConverterForm>

      {result && (
        <Result>
          {amount} {fromCurrency} = {result} {toCurrency}
        </Result>
      )}

      <ChartContainer>
        <ChartTitle>Historical Exchange Rate: USD to KES</ChartTitle>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="rate" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </ConverterContainer>
  );
};

export default CurrencyConverter;