const errorHandler = (error, req, res, next) => {
  console.log(error);
  if (error.name === "CUSTOMER_NOT_FOUND") {
    res.status(404).json({
      message: "Customer Not Found",
    });
  } else if (error.name === "ITEM_NOT_FOUND") {
    res.status(404).json({
      message: "Item Not Found",
    });
  } else if (error.name === "QTY_NOT_VALID") {
    res.status(400).json({
      message: "Quantity is not valid",
    });
  } else if (error.name === "TypeError") {
    res.status(400).json({
      message: "Please upload an image",
    });
  } else if (error.name === "SequelizeDatabaseError") {
    res.status(400).json({
      message: "Please fill all required fields",
    });
  } else {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = errorHandler;
