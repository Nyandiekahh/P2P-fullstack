const express = require('express');
const router = express.Router();
const Loan = require('../models/Loan');
const auth = require('../middleware/auth');

// Get all loans
router.get('/', auth, async (req, res) => {
  try {
    const loans = await Loan.find().populate('borrower', 'name email');
    res.json(loans);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create a new loan
router.post('/', auth, async (req, res) => {
  try {
    const newLoan = new Loan({
      ...req.body,
      borrower: req.user.id
    });
    const loan = await newLoan.save();
    res.json(loan);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add more routes as needed (get loan by id, update loan, delete loan, etc.)

module.exports = router;