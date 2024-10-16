const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
const path = require('path');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

dotenv.config();

mongoose.set('strictQuery', false);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working correctly!' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/auth', uploadRoutes);

// Function to get access token
const getAccessToken = async () => {
  try {
    const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      auth: {
        username: process.env.CONSUMER_KEY,
        password: process.env.CONSUMER_SECRET,
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
};

// Function to generate password for STK push
const generatePassword = () => {
  const shortcode = process.env.SHORTCODE;
  const passkey = process.env.PASSKEY;
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
  return Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');
};

// STK push endpoint
app.post('/api/initiate-payment', async (req, res) => {
  try {
    console.log('Received payment request:', req.body);
    const { phoneNumber, amount } = req.body;
    const accessToken = await getAccessToken();
    console.log('Access token obtained');
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = generatePassword();
    console.log('Initiating STK push...');
    const stkPush = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
      BusinessShortCode: process.env.SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: process.env.SHORTCODE,
      PhoneNumber: phoneNumber,
      CallBackURL: 'https://example.com/callback', // This is a placeholder
      AccountReference: 'Tech Titans',
      TransactionDesc: 'Payment for goods',
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log('STK push response:', stkPush.data);
    res.json(stkPush.data);
  } catch (error) {
    console.error('Error in initiate-payment:', error);
    if (error.response) {
      console.error('M-PESA API error response:', error.response.data);
    }
    res.status(500).json({ error: 'An error occurred', details: error.response ? error.response.data : error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});