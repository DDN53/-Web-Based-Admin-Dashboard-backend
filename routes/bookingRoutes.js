const express = require('express');
const router = express.Router();
const {
  getBookingAnalytics,
  seedBookings,
  getAllBookings,
  deleteBooking,
  updateBooking
} = require('../controllers/bookingController');

// Routes
router.get('/analytics', getBookingAnalytics);
router.post('/seed', seedBookings);
router.get('/bookings', getAllBookings);
router.delete('/:id', deleteBooking);
router.put('/:id', updateBooking);

module.exports = router;
