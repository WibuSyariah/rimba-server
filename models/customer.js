"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Sale, { foreignKey: "CustomerId" });
    }
  }
  Customer.init(
    {
      nama: DataTypes.STRING,
      contact: DataTypes.STRING,
      email: DataTypes.STRING,
      alamat: DataTypes.STRING,
      diskon: DataTypes.INTEGER,
      tipe_diskon: DataTypes.STRING,
      ktp: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
