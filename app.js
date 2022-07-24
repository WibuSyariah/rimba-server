const express = require("express");
const app = express();
const router = require("./routes");
const port = 3000;
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static("assets"));
app.use(express.json());
app.use("/", router);
app.use(errorHandler);

app.listen(port, () => {
  console.log("This app is running at port:", port);
});
