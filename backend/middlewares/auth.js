const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

  try {
    const tokenStr = token.replace('Bearer ', '');
    const verified = jwt.verify(tokenStr, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.level === 1) {
    next();
  } else {
    res.status(403).json({ message: 'Access Denied: Admin role required' });
  }
};

module.exports = { verifyToken, isAdmin };
