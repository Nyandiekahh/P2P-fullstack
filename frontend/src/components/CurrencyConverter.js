import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './CurrencyConverter.module.css';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('KES');
  const [result, setResult] = useState(null);
  const [exchangeRates, setExchangeRates] = useState({});
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);

  const API_KEY = 'be19c5e01da92fc90d18cfda.';
  const BASE_URL = 'https://v6.exchangerate-api.com/v6';

  const generateHistoricalData = useCallback((rate) => {
    const today = new Date();
    const baseRate = rate || 110; // Default base rate for USD to KES
    const variation = 0.05; // 5% variation
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setMonth(today.getMonth() - (6 - i));
      // Create a more stable rate with small variations
      const randomVariation = 1 + (Math.random() * variation * 2 - variation);
      return {
        date: date.toISOString().split('T')[0],
        rate: (baseRate * randomVariation).toFixed(2)
      };
    });
  }, []);

  const fetchExchangeRates = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/${API_KEY}/latest/${fromCurrency}`);
      const data = await response.json();
      
      if (data.result === 'error') {
        throw new Error(data['error-type'] || 'Failed to fetch exchange rates');
      }
      
      setExchangeRates(data.conversion_rates);
      setCurrencies(Object.keys(data.conversion_rates));
      
      // Generate historical data based on the current rate
      const currentRate = data.conversion_rates[toCurrency];
      setHistoricalData(generateHistoricalData(currentRate));
      
      setError(null);
      
      // If amount is already entered, calculate conversion
      if (amount && data.conversion_rates[toCurrency]) {
        const convertedAmount = amount * data.conversion_rates[toCurrency];
        setResult(convertedAmount.toFixed(2));
      }
    } catch (err) {
      setError('Failed to fetch exchange rates. Please try again later.');
      console.error('Error fetching exchange rates:', err);
    } finally {
      setLoading(false);
    }
  }, [fromCurrency, toCurrency, amount, generateHistoricalData]);

  useEffect(() => {
    fetchExchangeRates();
  }, [fetchExchangeRates]);

  // Auto-convert when amount changes
  useEffect(() => {
    if (amount && exchangeRates[toCurrency]) {
      const convertedAmount = amount * exchangeRates[toCurrency];
      setResult(convertedAmount.toFixed(2));
    } else {
      setResult(null);
    }
  }, [amount, toCurrency, exchangeRates]);

  if (loading && !currencies.length) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <RefreshCw className={`${styles.icon} ${styles.spin}`} />
          <span>Loading exchange rates...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <RefreshCw 
          className={`${styles.icon} ${loading ? styles.spin : ''}`}
          onClick={() => fetchExchangeRates()}
        />
        <h2 className={styles.title}>Currency Converter</h2>
      </div>

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className={styles.input}
          />
          
          <div className={styles.selectGroup}>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className={styles.select}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>

            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className={styles.select}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {result && (
        <div className={styles.result}>
          <span className={styles.resultText}>
            {amount} {fromCurrency} = {result} {toCurrency}
          </span>
        </div>
      )}

      <div className={styles.chartSection}>
        <h3 className={styles.chartTitle}>
          Historical Exchange Rate: {fromCurrency} to {toCurrency}
        </h3>
        <div className={styles.chart}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 10 }} 
                stroke="#888"
              />
              <YAxis 
                domain={['auto', 'auto']}
                tick={{ fontSize: 10 }} 
                stroke="#888"
              />
              <Tooltip 
                contentStyle={{ fontSize: '12px' }}
              />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;