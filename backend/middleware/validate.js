// middleware/validate.js
const { body } = require('express-validator');

/**
 * Validation rules for admin registration and login
 */
const validateAdmin = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];
const validateProfileUpdate = [
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email must be valid'),
  body('companyName')
    .optional()
    .notEmpty()
    .withMessage('Company name is required')
];
/**
 * Validation rules for sending donor invite email
 */
const validateDonorInvite = [
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('companyName')
    .trim()
    .notEmpty()
    .withMessage('Company name is required')
    .isLength({ min: 3 })
    .withMessage('Company name must be at least 3 characters long')
];

/**
 * Validation rules for donor registration
 */
const validateDonorRegistration = [
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('companyName')
    .trim()
    .notEmpty()
    .withMessage('Company name is required')
    .isLength({ min: 3 })
    .withMessage('Company name must be at least 3 characters long')
];

/**
 * Validation rules for donor login
 */
const validateDonorLogin = [
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];
const validateDeclineInvite = [
  body('inviteToken')
    .notEmpty()
    .withMessage('Invite token is required')
];
const validatePasswordChange = [
  body('oldPassword').notEmpty().withMessage('Old password is required'),
  body('newPassword')
    .notEmpty()
    .withMessage('New password is required')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long')
];
module.exports = { validatePasswordChange };
module.exports = {
  validateAdmin,
  validateDonorInvite,
  validateDonorRegistration,
  validateDonorLogin,
  validateDeclineInvite,
  validatePasswordChange,
  validateProfileUpdate
};