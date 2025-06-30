const express = require('express');
const router = express.Router();
const Customer = require('../models/customerModel');

// Get all customers
router.get('/', async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

// Add customer
router.post('/customer', async (req, res) => {
  const newCustomer = new Customer(req.body);
  await newCustomer.save();
  res.json({ message: 'Customer created' });
});

module.exports = router;
