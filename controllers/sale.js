const { Item, Customer, Sale, sequelize } = require("../models");

class SaleController {
  static async createSale(req, res, next) {
    const t = await sequelize.transaction();
    try {
      let { code_transaksi, tanggal_transaksi, qty, CustomerId, ItemIds } =
        req.body;

      const customer = await Customer.findByPk(CustomerId);

      if (!customer) {
        throw { name: "CUSTOMER_NOT_FOUND" };
      }

      let tempItemIds = [];

      if (ItemIds) {
        tempItemIds = ItemIds.split(",").map((itemId) => parseInt(itemId));
      }

      const items = await Item.findAll({
        where: {
          id: tempItemIds,
        },
      });

      if (!items) {
        throw { name: "ITEM_NOT_FOUND" };
      }

      let tempQty = [];

      if (qty) {
        tempQty = qty.split(",").map((qty) => parseInt(qty));
      }

      for (let i = 0; i < items.length; i++) {
        if (items[i].stok < tempQty[i] || !tempQty[i]) {
          throw { name: "QTY_NOT_VALID" };
        }
      }

      let total_harga = 0;
      for (let j = 0; j < items.length; j++) {
        total_harga += items[j].harga_satuan * tempQty[j];
      }

      let total_diskon = 0;
      if (customer.diskon) {
        if (customer.tipe_diskon === "persentase") {
          total_diskon = total_harga * (customer.diskon / 100);
        } else if (customer.tipe_diskon === "fix") {
          total_diskon = customer.diskon;
        }
      }

      let total_bayar = total_harga - total_diskon;

      items.forEach((item) => {
        Item.update(
          { stok: item.stok - tempQty[items.indexOf(item)] },
          { where: { id: item.id } },
          { transaction: t }
        );
      });

      const sale = await Sale.create(
        {
          code_transaksi,
          tanggal_transaksi,
          CustomerId,
          ItemIds,
          qty,
          total_diskon,
          total_harga,
          total_bayar,
        },
        { transaction: t }
      );

      await t.commit();

      res.status(201).json({
        message: "Sale Created",
        Sale: sale,
      });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async getAllSales(req, res, next) {
    try {
      let sales = await Sale.findAll();

      let tempItemsId = [];

      sales.forEach((sale) => {
        tempItemsId.push(
          sale.ItemIds.split(",").map((itemId) => parseInt(itemId))
        );
      });

      let tempItems = [];

      for (let i = 0; i < tempItemsId.length; i++) {
        tempItems.push(
          await Item.findAll({
            where: {
              id: tempItemsId[i],
            },
          })
        );
      }

      sales = sales.map((sale, index) => {
        return {
          ...sale.dataValues,
          items: tempItems[index],
        };
      });

      res.status(200).json({ Sales: sales });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SaleController;
