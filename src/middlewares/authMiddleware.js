const JWTUtils = require('../utils/JWTUtils');
const UserService = require('../services/userService');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];

      const decoded = JWTUtils.verifyToken(token);

      const user = await UserService.getUserById(decoded.userId);
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      req.user = user;

      return next();
    }

    return res.status(401).json({ error: 'Unauthorized' });
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
