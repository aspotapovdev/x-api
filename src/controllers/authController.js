const { validationResult } = require('express-validator');
const { registerValidator } = require('../validators/authValidators');
const AuthService = require('../services/authService');
const EmailService = require('../services/emailService');
const FileUploadService = require('../services/fileUploadService');
const JWTUtils = require('../utils/jwtUtils');

const register = async (req, res, next) => {
  try {
    const filePath = await FileUploadService.uploadFile(req, res);

    const userData = req.body;
    if (filePath) {
      userData.avatar = filePath;
    }

    const validators = registerValidator.map((validator) => validator.run(req));
    await Promise.all(validators);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    const userDTO = await AuthService.register(userData);

    const token = JWTUtils.generateToken({ userId: userDTO.id });
    await EmailService.sendVerificationEmail(userDTO, token);

    res.status(201).json({
      message:
        'Registration successful. A verification email has been sent to your email address.',
      user: userDTO,
    });
  } catch (error) {
    console.error('Error caught in register controller:', error);

    next(error);
  }
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const verifyEmail = async (req, res, next) => {
  await sleep(5000);
  try {
    const { token } = req.params;
    const payload = JWTUtils.verifyToken(token);
    const { userId } = payload;
    const userDTO = await AuthService.verifyEmail(userId);

    if (!userDTO) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: 'Email verification successful',
    });
  } catch (error) {
    console.error('Error caught in verifyEmail controller:', error);
    if (error.message === 'jwt malformed') {
      return res.status(400).json({
        message: 'Invalid token',
      });
    }

    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userDTO = await AuthService.login(email, password);

    if (!userDTO) {
      const error = new Error('Неверный email или пароль');
      error.statusCode = 401;
      throw error;
    }

    if (!userDTO.isVerified) {
      const error = new Error('Email не подтвержден');
      error.statusCode = 401;
      throw error;
    }

    const token = JWTUtils.generateToken({ userId: userDTO.id });
    res.status(200).json({
      message: 'Login successful',
      token,
      user: userDTO,
    });
  } catch (error) {
    console.error('Error caught in login controller:', error);
    next(error);
  }
};

module.exports = {
  register,
  verifyEmail,
  login,
};
