const mongoose = require('mongoose');

const SpecialistSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  specialization: { type: String, default: "" }
});

const BusinessSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    type: { 
      type: String,
      enum: ['', 'Hospital', 'Gym', 'Saloon', 'Spas', 'Car Wash'], // Allow empty string
      default: ""
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, default: "" },
    openTime: { type: String, default: "" }, // Format: HH:mm
    closeTime: { type: String, default: "" }, // Format: HH:mm
    specialists: { type: [SpecialistSchema], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Business || mongoose.model('Business', BusinessSchema);
