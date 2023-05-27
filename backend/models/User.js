const mongoose = require("mongoose");

const userShema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      minlength: 6,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    privilege: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
      lowercase: true,
    },
    wishList: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Products",
      default: [],
    },
    cart: {
      type: [
        {
          id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Products",
          },
          amount: { type: Number, default: 1 },
          color: { type: String },
          size: { type: String },
        },
      ],
      default: [],
    },
    order: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Orders",
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userShema);
