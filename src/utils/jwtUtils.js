const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

class JWTUtils {
  static generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  }

  static verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
  }
}

module.exports = JWTUtils;
