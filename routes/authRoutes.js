const express = require('express');
const router = express.Router();
const { loginBusiness } = require('../controllers/authController');

router.post('/login', loginBusiness);

module.exports = router;
