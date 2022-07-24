const express = require("express");
const router = express.Router();
const item = require("./item");
const customer = require("./customer");

router.use("/items", item);
router.use("/customers", customer);

module.exports = router;
