require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize express app
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', adminRoutes); // 🔁 removed /api

const donorRoutes = require('./routes/donorRoutes');
app.use('/donor', donorRoutes); // 🔁 removed /api

// Health check
app.get('/', (req, res) => {
  res.send('JalDhaara API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
