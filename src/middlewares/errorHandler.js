const { validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().reduce((acc, err) => {
      if (err.path) {
        acc[err.path] = err.msg;
      }

      return acc;
    }, {});

    return res.status(400).json({ errors: extractedErrors });
  }
  next();
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'An unknown error occurred';
  const field = err.field || null;
  const data = err.data || null;

  if (field) {
    return res.status(statusCode).json({ errors: { [field]: message } });
  }

  res.status(statusCode).json({ message, data });
};

module.exports = { handleValidationErrors, errorHandler };
