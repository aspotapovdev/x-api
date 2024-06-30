const bcrypt = require('bcryptjs');

class PasswordUtils {
  static async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  static async comparePasswords(rawPassword, hashedPassword) {
    return await bcrypt.compare(rawPassword, hashedPassword);
  }
}

module.exports = PasswordUtils;
