const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const stockSchema = mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      required: true,
      ref: "Product",
    },
    name: {
      type: String,
      lowercase: true,
      required: [true, "Title is required"],
      minLength: [3, "title must be 3 characters"],
      maxLength: [100, "title is too large"],
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      default: "pcs",
      enum: {
        values: ["kg", "litre", "pcs", "bag"],
        message: "unit must be kg/litre/pcs/bag",
      },
    },
    imageURLs: [
      {
        type: String,
        required: true,
        validate: {
          validator: function (value) {
            if (!Array.isArray(value)) false;
            let isValid = true;
            value.forEach((url) => {
              if (!validator.isULR(url)) isValid = false;
            });
            return isValid;
          },
        },
      },
    ],
    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "product price can't be negative"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "product quantity can't be negative"],
    },
    store: {
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
      id: {
        type: ObjectId,
        ref: "Store",
        required: true,
      },
    },
    suppliedBy: {
      name: {
        type: String,
        required: [true, "please provide supplier name"],
        trim: true,
      },
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discounted"],
        message: "status can't be {VALUE}",
      },
    },
  },
  { timestamps: true }
);

const Stock = mongoose.model("Stock", stockSchema);
module.exports = Stock;
