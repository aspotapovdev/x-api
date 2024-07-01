const UserService = require('../services/userService');

const getMe = async (req, res) => {
  res.status(200).json({
    user: req.user,
  });
};

const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    await UserService.changePassword(req.user.id, oldPassword, newPassword);

    res.status(200).json({
      message: 'Password changed successfully',
    });
  } catch (error) {
    console.error('Error caught in changePassword controller:', error);
    next(error);
  }
};

module.exports = {
  getMe,
  changePassword,
};
