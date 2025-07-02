const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer TOKEN"
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = verified;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
}

module.exports = authenticateToken;
