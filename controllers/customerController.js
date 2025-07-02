const Customer = require('../models/customerModel');

// Get all customers (sorted by createdAt desc)
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    console.error('Error fetching customers:', err);
    res.status(500).json({ message: 'Failed to fetch customers' });
  }
};

// Create new customer
const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (err) {
    console.error('Error creating customer:', err);
    res.status(500).json({ message: 'Server error creating customer' });
  }
};

module.exports = {
  getAllCustomers,
  createCustomer,
};
