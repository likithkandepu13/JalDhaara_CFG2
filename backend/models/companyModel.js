// models/Company.js

const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    csrSpentCrores: {
      type: Number,
      required: true
    },
    csrYear: {
      type: String,
      required: true
    },
    csrFocusAreas: {
      type: [String],
      default: []
    },
    csrExpenditureBreakup: {
      type: Map,
      of: Number,
      default: {}
    },
    budgetPercentage: {
      type: Number // optional; you can specify what it represents in UI (e.g., education/healthcare %)
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('Company', companySchema);