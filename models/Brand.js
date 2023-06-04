const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const BrandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: [true, "please provide a brand name"],
      maxLength: 100,
    },
    description: String,
    email: {
      type: String,
      lowercase: true,
      validate: [validator.isEmail, "please provide a valid email"],
    },
    website: {
      type: String,
      validate: [validator.isURL, "please provide valid URL"],
    },
    location: String,
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
    suppliers: [
      {
        name: String,
        contactNumber: String,
        id: {
          type: ObjectId,
          ref: "Supplier",
        },
      },
    ],
    status: {
      type: String,
      enum: ["active", "in-active"],
      default: "active",
    },
  },
  {
    timeStamps: true,
  }
);
const Brand = mongoose.model("Brand", BrandSchema);

module.exports = Brand;
