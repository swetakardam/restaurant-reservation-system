const express = require('express');
const Reservation = require('../models/Reservation');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/', authMiddleware, async (req, res) => {
  try {
    const { date, time, guests, name, phone } = req.body;
    const newReservation = new Reservation({
      user: req.user.id,
      date, time, guests, name, phone,
    });
    await newReservation.save();
    res.status(201).json({ message: 'Reservation created successfully', reservation: newReservation });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


router.get('/my', authMiddleware, async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const reservation = await Reservation.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    res.status(200).json({ message: 'Updated successfully', reservation });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const reservation = await Reservation.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;