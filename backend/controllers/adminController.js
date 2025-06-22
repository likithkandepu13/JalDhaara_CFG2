// controllers/adminController.js
const Admin = require('../models/adminModel');
const Donor = require('../models/donorModel');
const Company = require('../models/companyModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

// Your existing code (unchanged): registerAdmin, loginAdmin, sendDonorInvite, registerDonor, declineInvite, createCompany
const registerAdmin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    let admin = await Admin.findOne({ username });
    if (admin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    admin = new Admin({
      username,
      password: hashedPassword
    });

    await admin.save();

    const payload = {
      admin: {
        id: admin.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          token,
          message: 'Admin registered successfully'
        });
      }
    );
  } catch (err) {
    console.error('Error registering admin:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    let admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      admin: {
        id: admin.id
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
          message: 'Login successful'
        });
      }
    );
  } catch (err) {
    console.error('Error logging in admin:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const sendDonorInvite = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, companyName } = req.body;
    const adminId = req.admin.id; // From JWT auth middleware

    // Check MongoDB connection state
    if (mongoose.connection.readyState !== 1) {
      throw new Error('MongoDB is not connected');
    }

    // Check if donor already exists
    let donor = await Donor.findOne({ email });
    if (donor) {
      return res.status(400).json({ message: 'Donor with this email already exists' });
    }

    // Create temporary donor record with pending status
    donor = new Donor({
      email,
      companyName,
      status: 'pending',
      invitedBy: adminId
    });
    await donor.save();

    // Setup nodemailer transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use STARTTLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Generate invite token (valid for 24 hours)
    const inviteToken = jwt.sign(
      { donorId: donor.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Invite links
    const acceptLink = `${process.env.FRONTEND_URL}/donor/accept-invite/${inviteToken}`;
    const declineLink = `${process.env.FRONTEND_URL}/donor/decline-invite/${inviteToken}`;

    // Email content with Accept and Decline buttons
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Jaldhaara Foundation - Invitation to Become a Donor',
      html: `
        <h3>Dear ${companyName} Representative,</h3>
        <p>Jaldhaara Foundation invites you to partner with us to provide clean drinking water and sanitation to underserved communities in India.</p>
        <p>Please choose an option below:</p>
        <p>
          <a href="${acceptLink}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Accept Invitation</a>
          <a href="${declineLink}" style="display: inline-block; padding: 10px 20px; background-color: #f44336; color: white; text-decoration: none; border-radius: 5px; margin-left: 10px;">Decline Invitation</a>
        </p>
        <p>These links are valid for 24 hours.</p>
        <p>Thank you for considering our cause!</p>
        <p>Jaldhaara Foundation</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Invite sent successfully' });
  } catch (err) {
    console.error('Error sending donor invite:', err);
    if (err.name === 'MongoServerSelectionError') {
      return res.status(503).json({ message: 'Database connection error, please try again later' });
    }
  }
};

const registerDonor = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, companyName, inviteToken } = req.body;

    // Verify invite token
    let decoded;
    try {
      decoded = jwt.verify(inviteToken, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ message: 'Invalid or expired invite token' });
    }

    // Find donor by ID from token
    let donor = await Donor.findById(decoded.donorId);
    if (!donor || donor.email !== email || donor.status !== 'pending') {
      return res.status(400).json({ message: 'Invalid donor invite' });
    }

    // Update donor details
    const salt = await bcrypt.genSalt(10);
    donor.password = await bcrypt.hash(password, salt);
    donor.companyName = companyName;
    donor.status = 'accepted';
    await donor.save();

    // Generate JWT for donor login
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
        res.status(201).json({
          token,
          message: 'Donor registered successfully'
        });
      }
    );
  } catch (err) {
    console.error('Error registering donor:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const declineInvite = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { inviteToken } = req.body;

    // Verify invite token
    let decoded;
    try {
      decoded = jwt.verify(inviteToken, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ message: 'Invalid or expired invite token' });
    }

    // Find donor by ID from token
    let donor = await Donor.findById(decoded.donorId);
    if (!donor || donor.status !== 'pending') {
      return res.status(400).json({ message: 'Invalid or non-pending donor invite' });
    }

    // Update donor status to rejected
    donor.status = 'rejected';
    await donor.save();

    res.status(200).json({ message: 'Invitation declined successfully' });
  } catch (err) {
    console.error('Error declining donor invite:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createCompany = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, csrSpentCrores, csrYear, csrFocusAreas, csrExpenditureBreakup, budgetPercentage, plantInitiative} = req.body;

    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      throw new Error('MongoDB is not connected');
    }

    // Create new company
    const company = new Company({
      username,
      csrSpentCrores,
      csrYear,
      csrFocusAreas: csrFocusAreas || [],
      csrExpenditureBreakup: csrExpenditureBreakup || {},
      budgetPercentage
    });

    await company.save();

    res.status(201).json({ message: 'Company created successfully', company });
  } catch (err) {
    console.error('Error creating company:', err);
    if (err.name === 'MongoServerSelectionError') {
      return res.status(503).json({ message: 'Database connection error, please try again later' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Updated Company Methods with csrYear as Constraint
const getCompanies = async (req, res) => {
  try {
    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      throw new Error('MongoDB is not connected');
    }

    // Get csrYear from query parameter
    const { csrYear } = req.query;
    let query = {};
    if (csrYear) {
      query.csrYear = csrYear; // Filter by csrYear if provided
    }

    const companies = await Company.find(query);
    res.status(200).json(companies);
  } catch (err) {
    console.error('Error fetching companies:', err);
    if (err.name === 'MongoServerSelectionError') {
      return res.status(503).json({ message: 'Database connection error, please try again later' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const { csrYear } = req.query;

    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      throw new Error('MongoDB is not connected');
    }

    // Find company by ID and optionally check csrYear
    let query = { _id: id };
    if (csrYear) {
      query.csrYear = csrYear;
    }

    const company = await Company.findOne(query);
    if (!company) {
      return res.status(404).json({ message: 'Company not found or does not match the specified CSR year' });
    }

    res.status(200).json(company);
  } catch (err) {
    console.error('Error fetching company:', err);
    if (err.name === 'MongoServerSelectionError') {
      return res.status(503).json({ message: 'Database connection error, please try again later' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, csrSpentCrores, csrYear, csrFocusAreas, csrExpenditureBreakup, budgetPercentage ,plantInitiative} = req.body;
    const { requiredCsrYear } = req.query; // Use query to specify required CSR year

    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      throw new Error('MongoDB is not connected');
    }

    // Find company by ID and check requiredCsrYear if provided
    let query = { _id: id };
    if (requiredCsrYear) {
      query.csrYear = requiredCsrYear;
    }

    const company = await Company.findOne(query);
    if (!company) {
      return res.status(404).json({ message: 'Company not found or does not match the specified CSR year' });
    }

    // Update fields
    company.username = username || company.username;
    company.csrSpentCrores = csrSpentCrores || company.csrSpentCrores;
    company.csrYear = csrYear || company.csrYear;
    company.csrFocusAreas = csrFocusAreas || company.csrFocusAreas;
    company.csrExpenditureBreakup = csrExpenditureBreakup || company.csrExpenditureBreakup;
    company.budgetPercentage = budgetPercentage !== undefined ? budgetPercentage : company.budgetPercentage;

    await company.save();

    res.status(200).json({ message: 'Company updated successfully', company });
  } catch (err) {
    console.error('Error updating company:', err);
    if (err.name === 'MongoServerSelectionError') {
      return res.status(503).json({ message: 'Database connection error, please try again later' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { csrYear } = req.query;

    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      throw new Error('MongoDB is not connected');
    }

    // Find and delete company by ID and optionally check csrYear
    let query = { _id: id };
    if (csrYear) {
      query.csrYear = csrYear;
    }

    const company = await Company.findOneAndDelete(query);
    if (!company) {
      return res.status(404).json({ message: 'Company not found or does not match the specified CSR year' });
    }

    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (err) {
    console.error('Error deleting company:', err);
    if (err.name === 'MongoServerSelectionError') {
      return res.status(503).json({ message: 'Database connection error, please try again later' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  sendDonorInvite,
  registerDonor,
  declineInvite,
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany
};