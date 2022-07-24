const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer.js");
const ItemController = require("../controllers/item");

router.post("/", upload.single("barang"), ItemController.createItem);
router.get("/", ItemController.getAllItems);

module.exports = router;
