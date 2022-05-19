const { check } = require('express-validator');
const { validationResult } = require('../utils/');

const validateLogin = [
  check('email').exists().notEmpty(),
  check('password').exists().notEmpty(),
  (req, res, next) => {
    validationResult(req, res, next);
  },
];

const validateRegister = [
  check('name').exist().notEmpty(),
  check('age').exist().notEmpty().isNumeric({ min: 12, max: 118 }),
  check('email').exists().notEmpty().isEmail(),
  check('password').exists().notEmpty().isLength({ min:8, max:12 }),
  (req, res, next) => {
    validationResult(req, res, next);
  },
];

module.exports = { validateLogin, validateRegister };