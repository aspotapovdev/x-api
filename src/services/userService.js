const User = require('../models/User');

class UserService {
  async getUserById(id) {
    try {
      const user = await User.findById(id);

      return user.toDTO();
    } catch (error) {
      console.error('Error caught in getUserById service:', error);
      throw error;
    }
  }
}

module.exports = new UserService();
