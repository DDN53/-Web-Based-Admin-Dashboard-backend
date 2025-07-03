const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.log("❌ MongoDB connection error:", err));
const authenticateToken = require('./middleware/authMiddleware');
// Routes
const customerRoutes = require('./routes/customerRoutes');
app.use('/api/customers', authenticateToken, customerRoutes);
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
const bookingRoutes = require('./routes/bookingRoutes');
app.use('/api/bookings', bookingRoutes);


// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
