const errorHandler = (error, req, res, next) => {
  if (error.statusCode === 404) {
    res.status(404).json({
      message: "Not Found",
    });
  } else if (error.name === "TypeError") {
    res.status(400).json({
      message: "Please upload an image",
    });
  } else if (error.name === "SequelizeDatabaseError") {
    console.log(error);

    res.status(400).json({
      message: "Please fill all required fields",
    });
  } else {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = errorHandler;
