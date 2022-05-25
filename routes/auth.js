const express = require('express');
const router = express.Router();
const { registerCtrl, loginCtrl, changePassword } = require('../controllers/auth');
const { validateRegister, validateLogin } = require('../validators/auth');

router.post('/register', validateRegister, registerCtrl);

router.post('/login', validateLogin, loginCtrl);

router.post('/changePassword', validateLogin, changePassword);

module.exports = router;