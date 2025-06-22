// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, sendDonorInvite, registerDonor,declineInvite,createCompany,getCompanies,getCompanyById,updateCompany,deleteCompany } = require('../controllers/adminController');
const { validateAdmin, validateDonorInvite, validateDonorRegistration , validateDeclineInvite} = require('../middleware/validate');
const auth = require('../middleware/auth');

// Admin authentication middleware
router.post('/register', validateAdmin, registerAdmin);
router.post('/login', validateAdmin, loginAdmin);

// Donor management (protected routes)
router.post('/donor/invite', auth, validateDonorInvite, sendDonorInvite);
router.post('/donor/register', validateDonorRegistration, registerDonor);
router.post('/donor/decline', validateDeclineInvite, declineInvite); // New route
router.post('/company/create',  createCompany);
router.get('/companies/view', getCompanies);
router.get('/company/:id', auth, getCompanyById);
router.put('/company/update/:id', auth, updateCompany);
router.delete('/company/delete/:id', auth, deleteCompany);
module.exports = router;