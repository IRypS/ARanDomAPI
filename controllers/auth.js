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
    const oldPassword = password;
    const bodyInsert = { ...body, password, oldPassword };
    const data = await userModel.create(bodyInsert);
    res.send({data});

  } catch(e){
    handleHttpError(res, e);
    console.log(e);
  }
};

const changePassword = async(req, res) => {
  //correo
  //contraseña antigua == old
  //contraseña nueva == new /? Guardada en password
  try{
    const user = await userModel.findOne({ email: req.body.email });
    if(!user){
      handleErrorResponse(res, 'USER_NOT_EXISTS')
      return;
    }
    const checkPassword = await compare(req.body.oldPassword, user.password);
    if(!checkPassword){
      handleErrorResponse(res, 'LAS_CONTRASEÑAS_NO_COINCIDEN');
      return;
    }
    const password = await encrypt(req.body.password);
    const oldPassword = user.password;
    /*const user1 = req.body.email*/
    const data = await userModel.updateOne({ email : user.email }, { $set: { password: password, oldPassword : oldPassword } });
    res.send({data});
    //res.send(req.body.email);
  }catch(e){
    handleHttpError(res, e);
    console.log(e);
  }
}

module.exports = { loginCtrl, registerCtrl, changePassword };