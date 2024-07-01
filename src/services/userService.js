const User = require('../models/User');
const PasswordUtils = require('../utils/passwordUtils');

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

  async changePassword(id, oldPassword, newPassword) {
    try {
      const user = await User.findById(id);

      if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }

      const isPasswordValid = await PasswordUtils.comparePasswords(
        oldPassword,
        user.password,
      );

      if (!isPasswordValid) {
        const error = new Error('Неверный пароль');
        error.statusCode = 400;
        error.field = 'oldPassword';
        throw error;
      }

      user.password = await PasswordUtils.hashPassword(newPassword);
      await user.save();
    } catch (error) {
      console.error('Error caught in changePassword service:', error);
      throw error;
    }
  }

  async updateUser(id, userData) {
    try {
      const user = await User.findById(id);

      if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }

      Object.assign(user, userData);
      await user.save();

      return user.toDTO();
    } catch (error) {
      console.error('Error caught in updateUser service:', error);
      throw error;
    }
  }
}

module.exports = new UserService();
