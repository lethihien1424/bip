const Instructor = require('../models/Instructor');
const Course = require('../models/Course');

exports.getInstructors = async (req, res) => {
  try {
    // Chỉ liệt kê tài khoản quyền "Viewer" (level 2), is_active là 1. Không hiển thị level, password, is_active.
    const instructors = await Instructor.find({ level: 2, is_active: true }).select('-password -level -is_active');
    res.json(instructors);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getInstructorById = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id).select('-password');
    if (!instructor) return res.status(404).json({ message: 'Not found' });
    
    // Hide security fields if not authenticated
    // Note: Since this is purely public, we will just never send password
    // But if we want to conditionally hide 'is_active' based on authentication, we can check req.header
    let data = instructor.toObject();
    if (!req.header('Authorization')) {
      delete data.level;
      delete data.is_active;
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCourses = async (req, res) => {
  try {
    // Chỉ liệt kê khóa học có status là "Đang giảng dạy"(1) hoặc "Hoàn thành"(2)
    // created_by (instructor object if populated or we can filter it)
    let courses = await Course.find({ status: { $in: [1, 2] } })
                             .select('-sumary')
                             .populate({
                               path: 'created_by',
                               match: { is_active: true }, // Ensure created_by is active
                               select: '-password',
                               localField: 'created_by', 
                               foreignField: 'username'
                             });
                             
    // Filter out courses where created_by was filtered out due to match condition
    courses = courses.filter(course => course.created_by != null);
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
