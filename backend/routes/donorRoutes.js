// routes/donorRoutes.js
const express = require('express');
const router = express.Router();
const { loginDonor } = require('../controllers/donorController');
const { validateDonorLogin } = require('../middleware/validate');

router.post('/login', validateDonorLogin, loginDonor);

module.exports = router;