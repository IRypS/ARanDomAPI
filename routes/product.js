const express = require("express");
const router = express.Router();
const {
  getItem,
  getItems,
  updateItem,
  createItem,
  deleteItem,
} = require("../controllers/product");
const {
  validateId,
  validateObjectDataCreate,
  validateObjectDataUpdate,
} = require("../validators/product");

router.get("/", getItems);

router.get("/:id", validateId, getItem);

router.post("/", validateObjectDataCreate, createItem);

router.put("/:id", validateObjectDataUpdate, updateItem);

router.delete("/:id", validateId, deleteItem);

module.exports = router;