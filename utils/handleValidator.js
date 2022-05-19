const { validationResult } = require('express-validator');

const validationResult = (req, res, next) => {
  try{
    validationResult(req).throw();
    return next();

  } catch(e){
    res.status(403);
    res.send({ errors: err.array() });
  }
};

module.exports = { validationResult };