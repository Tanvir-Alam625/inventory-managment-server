const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: [true, "please provide a category name"],
    },
    imageURL: {
      type: String,
      validate: [validator.isURL, "please provide a valid url"],
    },
    description: String,
  },
  {
    timeStamps: true,
  }
);
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
