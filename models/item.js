"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Item.init(
    {
      nama_item: DataTypes.STRING,
      unit: DataTypes.STRING,
      stok: DataTypes.INTEGER,
      harga_satuan: DataTypes.INTEGER,
      barang: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
