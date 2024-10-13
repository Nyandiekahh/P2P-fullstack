// components/CurrencyConverter.js
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('KES');
  const [toCurrency, setToCurrency] = useState('USD');
  const [result, setResult] = useState('');

  const handleConvert = () => {
    // This is a mock conversion. In a real application, you would use an API to get current exchange rates.
    const rates = {
      KES: { USD: 0.0074, EUR: 0.0068, GBP: 0.0058 },
      USD: { KES: 135.5, EUR: 0.92, GBP: 0.79 },
      EUR: { KES: 147.3, USD: 1.09, GBP: 0.86 },
      GBP: { KES: 171.3, USD: 1.26, EUR: 1.16 }
    };

    if (fromCurrency === toCurrency) {
      setResult(amount);
    } else {
      const convertedAmount = (amount * rates[fromCurrency][toCurrency]).toFixed(2);
      setResult(convertedAmount);
    }
  };

  return (
    <div className="card currency-converter">
      <h2>Currency Converter</h2>
      <div className="converter-content">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="converter-input"
        />
        <div className="converter-selects">
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="converter-select"
          >
            <option value="KES">KES</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="converter-select"
          >
            <option value="KES">KES</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
        <button onClick={handleConvert} className="converter-button">
          <RefreshCw className="converter-icon" /> Convert
        </button>
        {result && (
          <div className="converter-result">
            <p>
              {amount} {fromCurrency} = {result} {toCurrency}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;