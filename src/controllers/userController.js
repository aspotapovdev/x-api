const UserService = require('../services/userService');
const FileUploadService = require('../services/fileUploadService');

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

const updateUser = async (req, res, next) => {
  try {
    const filePath = await FileUploadService.uploadFile(req, res);

    const userData = req.body;
    if (filePath) {
      userData.avatar = filePath;
    }

    const updatedUser = await UserService.updateUser(req.user.id, userData);

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error caught in updateUser controller:', error);
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserService.getAllUsers(req.user.id);

    res.status(200).json(users);
  } catch (error) {
    console.error('Error caught in getAllUsers controller:', error);
    next(error);
  }
};

module.exports = {
  getMe,
  changePassword,
  updateUser,
  getAllUsers,
};
