const Instructor = require('../models/Instructor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Instructor.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Tài khoản không tồn tại!' });
    }
    if (!user.is_active) {
      return res.status(403).json({ message: 'Tài khoản đã bị vô hiệu hóa!' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Mật khẩu không chính xác!' });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username, level: user.level },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );
    res.json({ token, user: { username: user.username, level: user.level } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
