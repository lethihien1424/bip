require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const authRoutes = require('./routes/auth');
const publicRoutes = require('./routes/public');
const privateRoutes = require('./routes/private');
const Instructor = require('./models/Instructor');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/admin', privateRoutes);

// Seed Default Admin Account
const seedAdmin = async () => {
  try {
    const adminExists = await Instructor.findOne({ username: 'admin' });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      const admin = new Instructor({
        username: 'admin',
        password: hashedPassword,
        level: 1,
        is_active: true
      });
      await admin.save();
      console.log('Default Admin Account Created -> username: admin, password: admin123');
    }
  } catch (err) {
    console.error('Seed Admin error:', err);
  }
};

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/course_management')
  .then(() => {
    console.log('MongoDB Connected');
    seedAdmin();
  })
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
