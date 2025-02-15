const Business = require('../models/Business');
const bcrypt = require('bcryptjs');

// Register new business account (minimal credentials)
const registerBusinessAccount = async (req, res) => {
  try {
    console.log('Incoming registration data:', req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      console.error('Missing email or password');
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    const existing = await Business.findOne({ email });
    if (existing) {
      console.error('Business already registered with email:', email);
      return res.status(400).json({ message: 'Business already registered' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const business = new Business({
      email,
      password: hashedPassword
    });
    await business.save();
    console.log('New business registered successfully:', business);
    res.status(201).json(business);
  } catch (err) {
    console.error('Registration Error:', err.stack);
    res.status(500).json({ message: err.message || 'Unknown error' });
  }
};

// Get businesses filtered by type and search query (for customer view)
const getBusinesses = async (req, res) => {
  try {
    const { type, search } = req.query;
    let query = {};
    if (type) {
      query.type = type;
    }
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    const businesses = await Business.find(query);
    res.json(businesses);
  } catch (err) {
    console.error('Error fetching businesses:', err.stack);
    res.status(500).json({ message: err.message });
  }
};

// Get a single business by ID (for customer view)
const getBusinessById = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      console.error('Business not found for id:', req.params.id);
      return res.status(404).json({ message: 'Business not found' });
    }
    res.json(business);
  } catch (err) {
    console.error('Error fetching business by ID:', err.stack);
    res.status(500).json({ message: err.message });
  }
};

// Update business profile (protected route)
// This allows a logged-in business owner to create or update their profile details.
const updateBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      console.error('Business not found for update with id:', req.params.id);
      return res.status(404).json({ message: 'Business not found' });
    }
    // Merge profile data (name, type, mobile, openTime, closeTime, specialists)
    Object.assign(business, req.body);
    await business.save();
    console.log('Business updated successfully:', business);
    res.json(business);
  } catch (err) {
    console.error('Error updating business:', err.stack);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  registerBusinessAccount,
  getBusinesses,
  getBusinessById,
  updateBusiness
};
