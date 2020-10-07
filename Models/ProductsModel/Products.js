const mongoose = require("mongoose");

//===========================================================PRODUCTS SCHEMA===============================================
const ProductSchema = mongoose.Schema({
  productName: { type: String, required: true },
  productDetails: { type: String, required: true },
  productPrice: { type: String, required: true },
  productImage: { type: String, required: true },
  isOnSale: { type: Boolean, default: false },
});

const Hoodies = mongoose.model("Hoodies", ProductSchema);
const Jackets = mongoose.model("Jackets", ProductSchema);
const T_Shirts = mongoose.model("T-Shirts", ProductSchema);
const AllProducts = mongoose.model("All-Products", ProductSchema);

module.exports = {
  Hoodies,
  Jackets,
  T_Shirts,
  AllProducts,
};
