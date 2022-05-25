const mongoose = require("mongoose");
const { encrypt, compare } = require('../utils/handlePassword');
const { matchedData, body } = require("express-validator");
const { handleHttpError, handleErrorResponse } = require("../utils/handleError");
const { userModel } = require("../models");

/**
 * Get detail by single row
 * @param {*} req
 * @param {*} res
 */
 const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const {id} = req;
    const data = await userModel.findById(id);
    res.send({data});
  } catch (e) {
    handleHttpError(res, e);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const data = await userModel.find({});
    res.send({data});
  } catch (e) {
    handleHttpError(res, e);
  }
};

/**
 * Upload and create record with public source
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
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

/**
 * update detail row
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {
  try {
    req = matchedData(req);
    const {id, ...body} = req;
    /* const id = req.id;
    const body = req; */
    const checkIsExist = await userModel.findOne({ email: body.email });
    if(checkIsExist) {
      handleErrorResponse(res, 'USER_EXIST');
      return;
    }
    const data = await userModel.findOneAndUpdate({_id:id}, { email : body.email, name : body.name, age : body.age }, {
      new: true,
    });
    console.log(id);
    console.log(body.name);
    res.send({ data });

  } catch (e) {
    handleHttpError(res, e);
    console.log(e);
  }
};

/**
 * delete row
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
  try {
    req = matchedData(req);
    const id = req.id;
    const findData = await userModel.delete({ _id: id });
    const data = {
      findData: findData,
      deleted: true,
    };

    res.send({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };