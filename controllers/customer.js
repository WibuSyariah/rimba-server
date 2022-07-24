const { Customer } = require("../models");
const fs = require("fs");
const BASE_URL = "http://localhost:3000/";

class CustomerController {
  static async createCustomer(req, res, next) {
    try {
      const { nama, contact, email, alamat, diskon, tipe_diskon } = req.body;

      const imagePath = req.file.path;
      const imageUrl = BASE_URL + imagePath;

      let customer = {
        nama,
        contact,
        email,
        alamat,
        ktp: imageUrl,
      };

      if (diskon) {
        customer = {
          ...customer,
          diskon,
          tipe_diskon,
        };
      }

      await Customer.create(customer);

      res.status(201).json({
        message: "Customer Created",
      });
    } catch (error) {
      if (req.file) {
        const imagePath = req.file.path;
        fs.unlinkSync(imagePath);
      }
      next(error);
    }
  }

  static async getAllCustomers(req, res, next) {
    try {
      const customers = await Customer.findAll();

      res.status(200).json({ Customers: customers });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CustomerController;
