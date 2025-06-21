// controllers/donorController.js
const Donor = require('../models/donorModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

/**
 * Login a donor
 */
const loginDonor = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if donor exists
    let donor = await Donor.findOne({ email });
    if (!donor || donor.status !== 'accepted') {
      return res.status(400).json({ message: 'Invalid credentials or donor not approved' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, donor.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT payload
    const payload = {
      donor: {
        id: donor.id
      }
    };

    // Sign token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          message: 'Donor login successful'
        });
      }
    );
  } catch (err) {
    console.error('Error logging in donor:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  loginDonor
};