const { check } = require('express-validator');
const { validateResult } = require('../utils/handleValidator');

const validateLogin = [
  check('email').exists().notEmpty(),
  check('password').exists().notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateRegister = [
  check('name').exists().notEmpty(),
  check('age').exists().notEmpty().isNumeric({ min: 12, max: 118 }),
  check('email').exists().notEmpty().isEmail(),
  check('password').exists().notEmpty().isLength({ min:8, max:12 }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateLogin, validateRegister };