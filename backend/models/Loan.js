const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  borrower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  interestRate: {
    type: Number,
    required: true
  },
  term: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'fully funded', 'repaid', 'defaulted'],
    default: 'pending'
  },
  purpose: String,
  description: String,
  riskScore: Number,
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateFunded: Date,
  dateRepaid: Date,
  currentlyFunded: {
    type: Number,
    default: 0
  },
  repaymentSchedule: [{
    dueDate: Date,
    amount: Number,
    status: {
      type: String,
      enum: ['pending', 'paid', 'overdue'],
      default: 'pending'
    }
  }]
});

module.exports = mongoose.model('Loan', LoanSchema);