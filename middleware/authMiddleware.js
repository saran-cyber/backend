const jwt = require('jsonwebtoken');
const Business = require('../models/Business');

const protect = async (req, res, next) => {
  let token =
    req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.business = await Business.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = { protect };
