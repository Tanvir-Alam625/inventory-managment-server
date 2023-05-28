const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
const DBConnect = require("./utils/DBConnect");

const app = require("./app");
const port = process.env.PORT || 8080;

// database connection
DBConnect();
// ESM

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});
