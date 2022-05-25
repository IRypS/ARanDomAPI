const express = require("express");
const router = express.Router();
const {
  getItem,
  getItems,
  updateItem,
  createItem,
  deleteItem,
} = require("../controllers/user");
const {
  validateId,
  validateObjectDataCreate,
  validateObjectDataUpdate,
} = require("../validators/user");

router.get("/", getItems);

router.get("/:id", validateId, getItem);

router.post("/", validateObjectDataCreate, createItem);

router.post("/:id", validateId, validateObjectDataUpdate, updateItem);

router.delete("/:id", validateId, deleteItem);

module.exports = router;