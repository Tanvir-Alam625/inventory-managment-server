const mongoose = require("mongoose");
const colors = require("colors");

const DBConnect = async () => {
  await mongoose
    .connect(process.env.MONGOOSE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Database connection successfully".cyan.bold);
    })
    .catch((error) => {
      console.log(`Error: ${error}`.red.bold);
    });
};
module.exports = DBConnect;
