const mongoose = require("mongoose");

const productShema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    userRating: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Users",
      default: [],
    },
    amount: {
      type: Number,
      default: 1,
    },
    avalable: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      require: true,
    },
    colors: {
      type: [String],
      enum: [
        "red",
        "green",
        "yellow",
        "orange",
        "blue",
        "purple",
        "dark",
        "white",
      ],
      lowercase: true,
    },
    sizes: {
      type: [String],
      enum: ["xs", "s", "m", "l", "xl"],
      lowercase: true,
    },
    price: {
      type: Number,
      require: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    imagesUrl: {
      type: [String],
      require: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", productShema);
