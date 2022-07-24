const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer.js");
const CustomerController = require("../controllers/customer");

router.post("/", upload.single("ktp"), CustomerController.createCustomer);
router.get("/", CustomerController.getAllCustomers);

module.exports = router;
