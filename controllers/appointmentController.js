const Appointment = require('../models/Appointment');
const Business = require('../models/Business');

const createAppointment = async (req, res) => {
  try {
    const { businessId, customerName, customerPhone, appointmentDate } = req.body;

    // Verify that the business exists
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

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
};

module.exports = { createAppointment };
