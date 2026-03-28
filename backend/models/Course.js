const mongoose = require('mongoose');
const slugify = require('slugify');

const courseSchema = new mongoose.Schema({
  course_code: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    unique: true
  },
  sumary: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    required: true
  },
  status: {
    type: Number,
    required: true,
    enum: [0, 1, 2], // 0: Đã xóa, 1: Đang giảng dạy, 2: Hoàn thành
    default: 1
  },
  created_by: {
    type: String,
    required: true,
    ref: 'Instructor' // references username
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

courseSchema.pre('save', async function () {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
});

module.exports = mongoose.model('Course', courseSchema);
