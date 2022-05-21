const { check } = require('express-validator');
const { validateResult } = require('../utils/handleValidator');

const validateObjectDataCreate = [
  check("name").exists().notEmpty(),
  check("price").exists().notEmpty().isNumeric(),
  check("description").exists().notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateObjectDataUpdate = [
  check("id").exists().notEmpty().isMongoId(),
  check("name").exists().notEmpty(),
  check("price").exists().notEmpty().isNumeric(),
  check("description").exists().notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateId = [
  check("id").exists().isMongoId(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateId, validateObjectDataCreate, validateObjectDataUpdate };