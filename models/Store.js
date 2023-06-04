const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const storeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "please provide a Store name"],
      enum: {
        values: [
          "dhaka",
          "rajshahi",
          "khulna",
          "sylhet",
          "barishal",
          "mymensingh",
          "rangpur",
          "chattogram",
        ],
        message: "{VALUE} is not valid name",
      },
    },
    description: String,
    status: {
      type: String,
      enum: ["active", "in-active"],
      default: "active",
    },
    manager: {
      name: String,
      contactNumber: String,
      id: {
        type: ObjectId,
        ref: "User",
      },
    },
  },
  {
    timeStamps: true,
  }
);
const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
