const Booking = require('../models/bookingModel');

// GET /analytics
const getBookingAnalytics = async (req, res) => {
  try {
    const result = await Booking.aggregate([
      {
        $group: {
          _id: { $month: '$date' },
          total: { $sum: 1 },
        }
      },
      {
        $project: {
          month: '$_id',
          total: 1,
          _id: 0
        }
      },
      { $sort: { month: 1 } }
    ]);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const final = result.map(r => ({
      month: months[r.month - 1],
      total: r.total
    }));

    res.json(final);
  } catch (err) {
    console.error('Analytics Error:', err);
    res.status(500).json({ message: 'Failed to load analytics' });
  }
};

// POST /seed
const seedBookings = async (req, res) => {
  try {
    const sampleBookings = [
      { customerName: 'John Doe', roomType: 'Deluxe', date: new Date('2024-01-10'), amount: 100 },
      { customerName: 'Jane Smith', roomType: 'Standard', date: new Date('2024-02-15'), amount: 80 },
      { customerName: 'Mark Lee', roomType: 'Deluxe', date: new Date('2024-02-20'), amount: 120 },
      { customerName: 'Anna Kim', roomType: 'Suite', date: new Date('2024-03-01'), amount: 200 },
      { customerName: 'David Park', roomType: 'Standard', date: new Date('2024-03-18'), amount: 90 },
      { customerName: 'Sara Liu', roomType: 'Suite', date: new Date('2024-04-05'), amount: 250 },
      { customerName: 'Sara Liudddd', roomType: 'Suitedddd', date: new Date('2024-04-20'), amount: 250 },
    ];

    await Booking.insertMany(sampleBookings);
    res.json({ message: 'Sample bookings inserted' });
  } catch (err) {
    res.status(500).json({ message: 'Error seeding data', error: err });
  }
};

// GET /bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: -1 });
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// DELETE /:id
const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete booking' });
  }
};

// PUT /:id
const updateBooking = async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update booking' });
  }
};

module.exports = {
  getBookingAnalytics,
  seedBookings,
  getAllBookings,
  deleteBooking,
  updateBooking,
};
