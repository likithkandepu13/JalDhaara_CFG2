const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    contactEmail: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model('Company', companySchema);