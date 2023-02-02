const mongoose = require("mongoose");

const ShoppingcartSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    cartItem: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Book",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    totalPrice: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Shoppingcart", ShoppingcartSchema);
