const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

router.post('/', async (req, res) => {
  try {
    const { businessId, customerName, customerPhone, appointmentDate } = req.body;
    const appointment = new Appointment({
      business: businessId,
      customerName,
      customerPhone,
      appointmentDate
    });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
