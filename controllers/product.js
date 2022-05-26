const mongoose = require("mongoose");
const { matchedData } = require("express-validator");
const { handleHttpError, handleErrorResponse } = require("../utils/handleError");
const { productModel } = require("../models");

/**
 * Get detail by single row
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const {id} = req;
    const data = await productModel.findById(id);
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
    const data = await productModel.find({});
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
  try {
    req = matchedData(req);
    console.log(req);
    const checkIsExist = await productModel.findOne({ name: req.name });
    if(checkIsExist) {
      /* handleErrorResponse(res, 'PRODUCT_EXIST');
      return; */
      try {
        const data = await productModel.findOneAndUpdate({_id:checkIsExist._id}, { name: req.name, price : req.price, description : req.description }, {
          new: true,
        });
      } catch (e) {
        handleHttpError(res, e);
        console.log(e);
      }
    }
    const data = await productModel.create(req);
    res.send({ data });
  } catch (e) {
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
    //const body = req;
    //const id = req.id;
    const {id, ...body} = req;
    const data = await productModel.findOneAndUpdate({_id:id}, body, {
      new: true,
    });

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
    const findData = await productModel.delete({ _id: id });
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