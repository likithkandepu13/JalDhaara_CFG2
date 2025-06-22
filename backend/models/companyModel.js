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
      type: [
        {
          category: { type: String, required: true },
          amount: { type: Number, required: true }
        }
      ],
      default: []
    },
    budgetPercentage: {
      type: Number
    },
    plantInitiative: {
      type: String,
      enum: ['hygiene', 'clean water', 'sanitation'],
     
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Company', companySchema);