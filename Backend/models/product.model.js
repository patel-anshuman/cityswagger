const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    sizes: {
      type: [String],
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const ProductModel = mongoose.model("product", productSchema);

//Export model
module.exports = { ProductModel };
