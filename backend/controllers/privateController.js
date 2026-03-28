const Instructor = require('../models/Instructor');
const Course = require('../models/Course');
const bcrypt = require('bcryptjs');

// --- Instructors ---
exports.getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find().select('-password');
    res.json(instructors);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createInstructor = async (req, res) => {
  let { username, password, level } = req.body;
  if (!username || !password || !level) {
    return res.status(400).json({ message: 'Vui lòng nhập đủ thông tin!' });
  }
  try {
    const existing = await Instructor.findOne({ username });
    if (existing) return res.status(400).json({ message: 'Username đã tồn tại!' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const instructor = new Instructor({
      username,
      password: hashedPassword,
      level
    });
    await instructor.save();
    res.status(201).json({ message: 'Thêm giảng viên thành công' });
  } catch (err) {
    console.error("Create Instructor Error:", err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.updateInstructor = async (req, res) => {
  const { password, level } = req.body; // Không sửa username
  try {
    let instructor = await Instructor.findById(req.params.id);
    if (!instructor) return res.status(404).json({ message: 'Not found' });

    if (password) {
      const salt = await bcrypt.genSalt(10);
      instructor.password = await bcrypt.hash(password, salt);
    }
    if (level) instructor.level = level;
    
    await instructor.save();
    res.json({ message: 'Cập nhật thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.toggleActiveInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) return res.status(404).json({ message: 'Not found' });
    
    instructor.is_active = !instructor.is_active;
    await instructor.save();
    res.json({ message: `Đã ${instructor.is_active ? 'Hiện' : 'Ẩn'} giảng viên` });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// --- Courses ---
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createCourse = async (req, res) => {
  const { course_code, title, sumary, credits, status } = req.body;
  if (!course_code || !title || !sumary || !credits) {
    return res.status(400).json({ message: 'Vui lòng nhập đủ thông tin!' });
  }
  try {
    const existing = await Course.findOne({ title });
    if (existing) return res.status(400).json({ message: 'Tên khóa học đã tồn tại!' });
    
    const existingCode = await Course.findOne({ course_code });
    if (existingCode) return res.status(400).json({ message: 'Mã khóa học đã tồn tại!' });

    const course = new Course({
      course_code,
      title,
      sumary,
      credits,
      status: status !== undefined ? status : 1,
      created_by: req.user.username // Auto save creator
    });
    await course.save();
    res.status(201).json({ message: 'Thêm khóa học thành công' });
  } catch (err) {
    console.error("Create Course Error:", err);
    res.status(500).json({ message: 'Server Error', error: err.stack });
  }
};

exports.updateCourse = async (req, res) => {
  const { course_code, title, sumary, credits, status } = req.body;
  try {
    let course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Not found' });

    if (title && title !== course.title) {
      const existing = await Course.findOne({ title });
      if (existing) return res.status(400).json({ message: 'Tên khóa học đã tồn tại!' });
      course.title = title;
    }
    
    if (course_code) course.course_code = course_code;
    if (sumary) course.sumary = sumary;
    if (credits) course.credits = credits;
    if (status !== undefined) course.status = status;

    await course.save();
    res.json({ message: 'Cập nhật thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.softDeleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Not found' });
    
    // Status 0: Đã xóa/Ngưng kinh doanh
    course.status = 0;
    await course.save();
    res.json({ message: 'Đã xóa (Ngưng kinh doanh) khóa học' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
