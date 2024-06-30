const express = require('express');
const authController = require('../controllers/authController');
const { handleValidationErrors } = require('../middlewares/errorHandler');
const router = express.Router();

router.post('/register', handleValidationErrors, authController.register);
router.get('/verify-email/:token', authController.verifyEmail);

module.exports = router;
