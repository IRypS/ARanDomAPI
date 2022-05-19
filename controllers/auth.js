const { encrypt, compare } = require('../utils/handlePassword');
const {
  handleErrorResponse,
  handleHttpError
} = require('../utils/handleError');

const { userModel } = require('../models');
const { matchedData } = require('express-validator');


/**
 * Control para el login
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const loginCtrl = async (req, res) => {
  try{
    const body = matchedData(req);
    const user = await userModel.findOne({ email: body.email });
    if(!user) {
      handleErrorResponse(res, 'EL_USUARIO_NO_EXISTE', 404);
      return;
    }

    const checkPassword = await compare(body.password, user.password);
    if(!checkPassword){
      handleErrorResponse(res, 'CONTRASEÑA_INCORRECTA', 402);
      return;
    }

    res.send({user});

  } catch(e){
    handleHttpError(res, e);
  }
};


/**
 * Control para el registro
 * @param {*} req 
 * @param {*} res 
 */
const registerCtrl = async(req, res) => {
  try{
    const body = matchedData(req);
    const checkIsExist = await userModel.findOne({ email: body.email });
    if(checkIsExist) {
      handleErrorResponse(res, 'USER_EXIST');
      return;
    }
    const password = await encrypt(body.password);
    const bodyInsert = { ...body, password };
    const data = await userModel.create(bodyInsert);
    res.send({data});

  } catch(e){
    handleHttpError(res, e);
    console.log(e);
  }
};

module.exports = { loginCtrl, registerCtrl };