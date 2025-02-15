// backend/routes/businessRoutes.js
const express = require('express');
const router = express.Router();
const { 
  registerBusinessAccount, 
  getBusinesses, 
  getBusinessById, 
  updateBusiness 
} = require('../controllers/businessController');
const { protect } = require('../middleware/authMiddleware');

// Public route for new business account registration
router.post('/', registerBusinessAccount);

// Protected route to get the logged-in business profile
router.get('/profile', protect, (req, res) => {
  res.json(req.business);
});

// Public route for customer view: Get all businesses
router.get('/', getBusinesses);

// Public route for customer view: Get a single business by ID
router.get('/:id', getBusinessById);

// Protected route for updating a business profile (requires login)
router.put('/:id', protect, updateBusiness);

module.exports = router;
