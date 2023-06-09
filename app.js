const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Require All Routes
const productRoute = require("./routes/v1/product.routes");
const brandRoute = require("./routes/v1/brand.routes");
const stockRoute = require("./routes/v1/stock.routes");

app.use("/api/v1/product", productRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/stock", stockRoute);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
