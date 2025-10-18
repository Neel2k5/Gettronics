import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  productID: {
    type: String,
    required: true,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true,
  },
  productImage: {
    type: String, //  image CDN URL
  },
  productType: {
    type: String,
    required: true,
    enum: ["general", "laptops", "smartphones", "tablets", "acessories", "others"]

  },
  productDescription: {
    type: String,
    required: true,
    maxlength: 1000, // optional: limit description length
  },
  productVendor: {
    vendorName: {
      type: String,
      required: true,
    },
    vendorEmail: {
      type: String,
      required: true,
    },
  },
});

const ProductModel = mongoose.model("Products", ProductSchema);
export default ProductModel;
