// models/Donor.js

const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    phone: {
      type: String
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company'
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('Donor', donorSchema);