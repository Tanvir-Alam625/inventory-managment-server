const mongoose = require("mongoose");

const DBConnect = async () => {
  await mongoose
    .connect(process.env.MONGOOSE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Database connection successfully");
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};
module.exports = DBConnect;
