const PasswordUtils = require('../utils/PasswordUtils');
const User = require('../models/User');

class AuthService {
  async register(userData) {
    const { name, email, password, dateOfBirth, gender, avatar } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error('Пользователь с таким email уже существует');
      error.statusCode = 400;
      error.field = 'email';
      throw error;
    }

    const hashedPassword = await PasswordUtils.hashPassword(password);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
      gender,
      avatar,
    });

    await user.save();

    return user.toDTO();
  }

  async verifyEmail(userId) {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    user.isVerified = true;
    await user.save();

    return user.toDTO();
  }
}

module.exports = new AuthService();
