const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  is_active: {
    type: Boolean,
    default: true
  },
  level: {
    type: Number,
    required: true,
    enum: [1, 2] // 1: Admin, 2: Giảng viên
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Instructor', instructorSchema);
