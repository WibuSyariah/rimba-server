const express = require("express");
const router = express.Router();
const item = require("./item");
const customer = require("./customer");
const sale = require("./sale");

router.use("/items", item);
router.use("/customers", customer);
router.use("/sales", sale);

module.exports = router;
