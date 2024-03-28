import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    cusProductID: {
      type: "string",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    actualPrice: {
      type: Number,
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    added_date: {
      type: String,
      // required: true,
    },
    expire_date: {
      type: String,
      // required: true,
    },
  },
  { timeStamps: true }
);

const Product = mongoose.model("product", productSchema);

export default Product;
