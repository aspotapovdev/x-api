const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/me', authMiddleware, userController.getMe);
router.post('/change-password', authMiddleware, userController.changePassword);

module.exports = router;
