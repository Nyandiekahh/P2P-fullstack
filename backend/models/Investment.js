const mongoose = require('mongoose');

const InvestmentSchema = new mongoose.Schema({
  investor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  loan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Loan',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  dateInvested: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'repaid', 'defaulted'],
    default: 'active'
  },
  expectedReturn: Number,
  actualReturn: Number
});

module.exports = mongoose.model('Investment', InvestmentSchema);