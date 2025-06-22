const Donor = require('../models/donorModel');
const Admin = require('../models/adminModel');
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

    let donor = await Donor.findOne({ email });
    if (!donor || donor.status !== 'accepted') {
      return res.status(400).json({ message: 'Invalid credentials or donor not approved' });
    }

    const isMatch = await bcrypt.compare(password, donor.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      donor: {
        id: donor.id
      }
    };

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

/**
 * Get donor profile by email
 */
const getDonorProfile = async (req, res) => {
  try {
    // Fetch the authenticated donor by ID to get their email
    const authDonor = await Donor.findById(req.donor.id).select('email');
    if (!authDonor) {
      return res.status(404).json({ message: 'Authenticated donor not found' });
    }

    // Fetch the donor profile by email, excluding the password
    const donor = await Donor.findOne({ email: authDonor.email }).select('-password');
    if (!donor) {
      return res.status(404).json({ message: 'Donor profile not found' });
    }

    res.json(donor);
  } catch (err) {
    console.error('Error fetching donor profile:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Update donor profile
 */
const updateDonorProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, companyName } = req.body;
    const donorId = req.donor.id;

    let donor = await Donor.findById(donorId);
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    if (email && email !== donor.email) {
      const existingDonor = await Donor.findOne({ email });
      if (existingDonor) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      donor.email = email;
    }

    if (companyName) {
      donor.companyName = companyName;
    }

    await donor.save();
    res.json({ message: 'Profile updated successfully', donor });
  } catch (err) {
    console.error('Error updating donor profile:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Change donor password
 */
const changeDonorPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { oldPassword, newPassword } = req.body;
    const donorId = req.donor.id;

    let donor = await Donor.findById(donorId);
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, donor.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect old password' });
    }

    const salt = await bcrypt.genSalt(10);
    donor.password = await bcrypt.hash(newPassword, salt);
    await donor.save();

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error('Error changing donor password:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Get inviting admin details
 */
const getInvitingAdmin = async (req, res) => {
  try {
    const donor = await Donor.findById(req.donor.id).select('invitedBy');
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    const admin = await Admin.findById(donor.invitedBy).select('username');
    if (!admin) {
      return res.status(404).json({ message: 'Inviting admin not found' });
    }

    res.json({ username: admin.username });
  } catch (err) {
    console.error('Error fetching inviting admin:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  loginDonor,
  getDonorProfile,
  updateDonorProfile,
  changeDonorPassword,
  getInvitingAdmin
};