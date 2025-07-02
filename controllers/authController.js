const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/adminModel');

// POST /api/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ message: 'Invalid email or password' });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

// POST /api/auth/register
const register = async (req, res) => {
  const { email, password } = req.body;

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = new Admin({ email, password: hashedPassword });
  await admin.save();

  res.json({ message: 'Admin registered successfully' });
};

module.exports = {
  login,
  register
};
