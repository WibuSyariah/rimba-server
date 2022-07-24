"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Sales", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      code_transaksi: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tanggal_transaksi: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      CustomerId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: "Customers" },
          key: "id",
        },
        allowNull: false,
      },
      ItemIds: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      qty: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total_diskon: {
        type: Sequelize.INTEGER,
      },
      total_harga: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total_bayar: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Sales");
  },
};
