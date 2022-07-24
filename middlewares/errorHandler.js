const errorHandler = (error, req, res, next) => {
  if (error.name === "SequelizeValidationError") {
    let newError = error.errors.map((err) => err.message);
    res.status(400).json({
      message: newError[0],
    });
  } else if (error.statusCode === 404) {
    res.status(404).json({
      message: "Not Found",
    });
  } else if (error.name === "TypeError") {
    res.status(400).json({
      message: "Please upload an image",
    });
  } else {
    // console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = errorHandler;
