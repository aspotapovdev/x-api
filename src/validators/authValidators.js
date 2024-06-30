const { check } = require('express-validator');

const registerValidator = [
  check('name').notEmpty().withMessage('Имя обязательно'),
  check('email').isEmail().withMessage('Пожалуйста добавьте валидный email'),
  check('password')
    .isLength({ min: 6 })
    .withMessage(
      'Пожалуйста добавьте пароль который содержит 6 или более символов',
    ),
  check('dateOfBirth')
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage('Пожалуйста добавьте дату рождения в формате YYYY-MM-DD'),
  check('gender').notEmpty().withMessage('Пол обязателен'),
];

module.exports = {
  registerValidator,
};
