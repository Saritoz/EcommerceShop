const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      require: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Categories", categorySchema);
