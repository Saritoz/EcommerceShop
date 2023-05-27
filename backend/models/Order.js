const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    id_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    id_product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
    amount: {
      type: Number,
    },
    type: {
      type: String,
    },
    total: {
      type: Number,
    },
    address: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "cancel", "paid", "delivery"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Orders", orderSchema);
