const Business = require('../models/Business');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginBusiness = async (req, res) => {
  try {
    const { email, password } = req.body;
    const business = await Business.findOne({ email });
    if (!business) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, business.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: business._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({
      token,
      business: {
        id: business._id,
        email: business.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { loginBusiness };
