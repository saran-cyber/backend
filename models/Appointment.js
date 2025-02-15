const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema(
  {
    business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    appointmentDate: { type: Date, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);
