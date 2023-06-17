const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
const productSchema = mongoose.Schema(
  // schema design
  {
    name: {
      type: String,
      lowercase: true,
      required: [true, "name is required"],
      minLength: [3, "name must be 3 characters"],
      maxLength: [100, "name is too large"],
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },

    unit: {
      type: String,
      default: "pcs",
      enum: {
        values: ["kg", "litre", "pcs", "bag"],
        message: "unit must be kg/litre/pcs/bag",
      },
    },
    imageURL: [
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
    // relation by Embedded -> Categories
    // categories: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
    // relation by reference -> Supplier
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Supplier",
    // },
  },
  //   mongoose options
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
