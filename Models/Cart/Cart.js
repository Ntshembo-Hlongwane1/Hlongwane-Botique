const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  owner: { type: String, required: true },
  cart: { type: Array, required: true },
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = { Cart };
