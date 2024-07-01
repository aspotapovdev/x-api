const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/me', authMiddleware, userController.getMe);
router.post('/change-password', authMiddleware, userController.changePassword);
router.put('/update', authMiddleware, userController.updateUser);
router.get('/all', authMiddleware, userController.getAllUsers);

module.exports = router;
