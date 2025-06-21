// models/CompanyAdmin.js

const mongoose = require('mongoose');

const companyAdminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('CompanyAdmin', companyAdminSchema);