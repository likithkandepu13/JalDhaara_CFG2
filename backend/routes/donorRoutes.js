const express = require('express');
const router = express.Router();
const {
  loginDonor,
  getDonorProfile,
  updateDonorProfile,
  changeDonorPassword,
  getInvitingAdmin
} = require('../controllers/donorController');

const {
  validateDonorRegistration,
  validatePasswordChange,
  validateProfileUpdate // ✅ Using dedicated profile update validator
} = require('../middleware/validate');

const auth = require('../middleware/auth');

// Public routes
router.post('/login',  loginDonor);

// Protected routes
router.get('/profile', auth, getDonorProfile);
router.put('/profile', auth, validateProfileUpdate, updateDonorProfile);
router.put('/password', auth, validatePasswordChange, changeDonorPassword);
router.get('/invited-by', auth, getInvitingAdmin);

module.exports = router;
