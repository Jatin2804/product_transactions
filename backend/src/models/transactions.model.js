const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Fixed "tyepe" typo
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  image: { type: String },
  sold: { type: Boolean, required: true },
  dateOfSale: { type: Date, required: true }
});

const transactionModel = mongoose.model("Transaction", transactionSchema);

module.exports = transactionModel;
