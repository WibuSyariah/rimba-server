const express = require("express");
const router = express.Router();
const SaleController = require("../controllers/sale");

router.post("/", SaleController.createSale);
router.get("/", SaleController.getAllSales);

module.exports = router;
