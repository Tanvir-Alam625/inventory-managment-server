const { Schema } = require("mongoose");

const ProductSchema = Schema(
  // schema design
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minLength: [3, "title must be 3 characters"],
      maxLength: [10, "title is too large"],
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "price value is required"],
      min: [0, "negative value can't accept"],
    },
    unit: {
      type: String,
      default: "pcs",
      enum: {
        values: ["kg", "litre", "pcs"],
        message: "unit must be kg/litre/pcs",
      },
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["in-stock", "out-of-stock", "discontinued"],
      required: true,
    },
    // relation by Embedded -> Categories
    categories: [
      {
        name: {
          type: String,
          required: true,
        },
        _id: Schema.Types.ObjectId,
      },
    ],
    // relation by reference -> Supplier
    supplier: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
    },
    rating: {
      rate: {
        type: Number,
        default: 5,
        min: 1,
      },
      count: {
        type: Number,
        default: 100,
        min: 0,
      },
    },
  },
  //   options
  {
    timestamps: true,
  }
);

module.exports = ProductSchema;
