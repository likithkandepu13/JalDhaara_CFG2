// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, sendDonorInvite, registerDonor,declineInvite } = require('../controllers/adminController');
const { validateAdmin, validateDonorInvite, validateDonorRegistration , validateDeclineInvite} = require('../middleware/validate');
const auth = require('../middleware/auth');

// Admin authentication middleware
router.post('/register', validateAdmin, registerAdmin);
router.post('/login', validateAdmin, loginAdmin);

// Donor management (protected routes)
router.post('/donor/invite', auth, validateDonorInvite, sendDonorInvite);
router.post('/donor/register', validateDonorRegistration, registerDonor);
router.post('/donor/decline', validateDeclineInvite, declineInvite); // New route

module.exports = router;