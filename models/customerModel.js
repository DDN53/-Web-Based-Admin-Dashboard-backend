const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  joined: { type: String },
}, {
  timestamps: true
});

module.exports = mongoose.model('Customer', customerSchema);
