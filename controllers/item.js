const { Item } = require("../models");
const fs = require("fs");
const BASE_URL = "http://localhost:3000/";

class ItemController {
  static async createItem(req, res, next) {
    try {
      const { nama_item, unit, stok, harga_satuan } = req.body;

      const imagePath = req.file.path;
      const imageUrl = BASE_URL + imagePath;

      await Item.create({
        nama_item,
        unit,
        stok,
        harga_satuan,
        barang: imageUrl,
      });

      res.status(201).json({
        message: "Item Created",
      });
    } catch (error) {
      if (req.file) {
        const imagePath = req.file.path;
        fs.unlinkSync(imagePath);
      }
      next(error);
    }
  }

  static async getAllItems(req, res, next) {
    try {
      const items = await Item.findAll();

      res.status(200).json({ Items: items });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ItemController;
