// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, sendDonorInvite, registerDonor } = require('../controllers/adminController');
const { validateAdmin, validateDonorInvite, validateDonorRegistration } = require('../middleware/validate');
const auth = require('../middleware/auth');

// Admin authentication middleware
router.post('/register', validateAdmin, registerAdmin);
router.post('/login', validateAdmin, loginAdmin);

// Donor management (protected routes)
router.post('/donor/invite', auth, validateDonorInvite, sendDonorInvite);
router.post('/donor/register', validateDonorRegistration, registerDonor);

module.exports = router;