require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');



const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend port if different
  credentials: true // Optional: if you are using cookies or sessions
}));
app.use(express.json());
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const adminRoutes=require('./routes/adminRoutes')
app.use('/admin',adminRoutes);
const donorRoutes=require('./routes/donorRoutes')
app.use('/donor',donorRoutes);

const PORT = process.env.PORT 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));